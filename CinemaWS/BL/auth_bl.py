import jwt
from DAL.credentials_DB_DAL import CredentialsDBDAL
from DAL.permissions_file_DAL import PermissionsFileDAL
from DAL.users_file_DAL import UsersFileDAL
from datetime import datetime, timedelta, timezone

# Authentication BL, responsible for authentication of credentials and validating permissions
# Every non-private method also returns a full response with token, username and permissions list


class AuthBL:

    def __init__(self):
        self.__key = "server_key"
        self.__algorithm = "HS256"
        self.__credentials = CredentialsDBDAL()
        self.__permissions = PermissionsFileDAL()
        self.__users = UsersFileDAL()

    # Authenticate login credentials
    def authenticate(self, username, password):
        db_user = self.__credentials.get_doc_by_username(username)
        if db_user and db_user['password'] == password:
            response = self.__create_response(username)
            return response
        return {'error': 'Login Failed'}

    # Create new accounts
    def create_account(self, username, password):
        response = None
        db_user = self.__credentials.get_doc_by_username(username)
        if not db_user['password']:
            db_user['password'] = password
            self.__credentials.update_doc(db_user['_id'], db_user)
            response = self.__create_response(username)
        return response

    # Confirm user is an admin
    def check_admin(self, token):
        try:
            data = jwt.decode(token, self.__key, self.__algorithm)
            username = data['username']
            if not username == "admin":
                return {'error': "Unauthorized Request"}
            response = self.__create_response(username)
            return response
        except jwt.InvalidSignatureError:
            return {"error": "Bad Token"}
        except jwt.ExpiredSignatureError:
            return {"error": "Token Expired"}

    # Check if user has the permission asked
    def check_permission_refresh_token(self, token, permission_asked):
        try:
            data = jwt.decode(token, self.__key, self.__algorithm)
            username = data['username']
            response = self.__create_response(username)
            if type(permission_asked) is list:
                if not any(perm in response['permissions'] for perm in permission_asked):
                    return {'error': "Unauthorized Request"}
            elif permission_asked not in response['permissions']:
                return {'error': "Unauthorized Request"}
            return response
        except jwt.InvalidSignatureError:
            return {"error": "Bad Token"}
        except jwt.ExpiredSignatureError:
            return {"error": "Token Expired"}

    # Create a response with username, token and permissions
    def __create_response(self, username):
        db_user = self.__credentials.get_doc_by_username(username)
        _id = str(db_user['_id'])
        token = self.__create_token(username, _id)
        permissions = self.__get_permissions(_id)
        response = {'username': username, 'token': token, 'permissions': permissions}
        return response

    # Create a new token with an expiration period given by session_timeout
    def __create_token(self, username, _id):
        session_timeout = self.__get_session_timeout(_id)
        if session_timeout == 0:
            session_timeout = 15  # 15 minutes default time for session timeout
        now = datetime.now(timezone.utc)
        token_exp = now + timedelta(minutes=session_timeout)
        token = jwt.encode({"username": username, "exp": token_exp}, self.__key, self.__algorithm)
        return token

    # Get session_timeout parameter from users.json
    def __get_session_timeout(self, _id):
        session_timeout = 0
        users_file_json = self.__users.read_file()
        users_arr = users_file_json['users']
        find_user = list(filter(lambda x: x['_id'] == _id, users_arr))
        if find_user and "session_timeout" in find_user[0].keys():
            session_timeout = find_user[0]['session_timeout']
        return int(session_timeout)

    # Get permissions parameter from permissions.json
    def __get_permissions(self, _id):
        user_permissions = []
        permissions_data = self.__permissions.read_file()
        permissions_arr = permissions_data['permissions']
        find_user = list(filter(lambda x: x['_id'] == _id, permissions_arr))
        if find_user:
            user_permissions = find_user[0]['permissions']
        return user_permissions







