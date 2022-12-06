from DAL.users_file_DAL import UsersFileDAL
from DAL.permissions_file_DAL import PermissionsFileDAL
from DAL.credentials_DB_DAL import CredentialsDBDAL

# Users BL, responsible for all users actions logic


class UsersBL:

    def __init__(self):
        self.__users = UsersFileDAL()
        self.__permissions = PermissionsFileDAL()
        self.__credentials = CredentialsDBDAL()

    def get_all_users(self):

        # Get Data from users.json
        data = self.__users.read_file()
        users = data["users"]

        # Get Data from permissions.json
        data = self.__permissions.read_file()
        permissions = data["permissions"]

        # Get Data from credentialsDB
        credentials = self.__credentials.get_whole_collection()
        users_full_data = []

        # Create user with full data and append to an array
        for user in users:
            get_permissions = list(filter(lambda x: x["_id"] == user['_id'], permissions))
            user_permissions = get_permissions[0]
            get_creds = list(filter(lambda x: str(x["_id"]) == user['_id'], credentials))
            user_creds = get_creds[0]

            new_user = {key: user[key] for key in user.keys() & {'_id', 'fname', 'lname',
                                                                 'creation_date', 'session_timeout'}}
            new_user['permissions'] = user_permissions['permissions']
            new_user['username'] = user_creds['username']

            users_full_data.append(new_user)

        return users_full_data

    def get_user(self, _id):

        # Get user's data from users.json
        data = self.__users.read_file()
        users = data["users"]
        arr = list(filter(lambda x: x["_id"] == _id, users))
        user = arr[0]

        # Get user's data from permissions.json and add it to the user object
        data = self.__permissions.read_file()
        permissions = data["permissions"]
        arr = list(filter(lambda x: x["_id"] == _id, permissions))
        permissions = arr[0]
        user['permissions'] = permissions['permissions']

        # Get Data from credentialsDB
        data = self.__credentials.get_doc(_id)
        username = data["username"]
        user['username'] = username

        return user

    def add_user(self, obj):

        # Add in CredentialsDB and receive id
        creds = {'username': obj['username'], 'password': ''}
        obj['_id'] = str(self.__credentials.add_doc(creds))

        # Add in users.json
        user = {key: obj[key] for key in obj.keys() & {'_id', 'fname', 'lname',
                                                       'creation_date', 'session_timeout'}}
        data = self.__users.read_file()
        users = data["users"]
        users.append(user)
        users_json = {"users": users}
        self.__users.write_file(users_json)

        # Add in permissions.json
        new_permissions = {'permissions': obj['permissions'], '_id': obj['_id']}
        data = self.__permissions.read_file()
        all_permissions = data["permissions"]
        all_permissions.append(new_permissions)
        permissions_json = {"permissions": all_permissions}
        self.__permissions.write_file(permissions_json)

        return obj['_id']

    def update_user(self, _id, obj):

        obj['_id'] = _id

        # Update in users.json
        user = {key: obj[key] for key in obj.keys() & {'fname', 'lname', '_id',
                                                       'creation_date', 'session_timeout'}}
        data = self.__users.read_file()
        users = data["users"]
        for i in range(len(users)):
            if users[i]["_id"] == _id:
                users[i] = user
                break

        users_json = {"users": users}
        self.__users.write_file(users_json)

        # Update in permissions.json
        new_permissions = obj['permissions']
        data = self.__permissions.read_file()
        all_permissions = data["permissions"]
        for i in range(len(all_permissions)):
            if all_permissions[i]["_id"] == _id:
                all_permissions[i]['permissions'] = new_permissions
                break

        permissions_json = {"permissions": all_permissions}
        self.__permissions.write_file(permissions_json)

        # Update in CredentialsDB
        self.__credentials.update_element(_id, "username", obj['username'])

        return "Updated!"

    def delete_users(self, _id):

        # Delete from users.json
        index = 0
        data = self.__users.read_file()
        users = data["users"]
        for i in range(len(users)):
            if users[i]["_id"] == _id:
                index = i
                break

        users.pop(index)
        obj = {"users": users}
        self.__users.write_file(obj)

        # Delete from permissions.json
        index = 0
        data = self.__permissions.read_file()
        permissions = data["permissions"]
        for i in range(len(permissions)):
            if permissions[i]["_id"] == _id:
                index = i
                break

        permissions.pop(index)
        obj = {"permissions": permissions}
        self.__permissions.write_file(obj)

        # Delete from CredentialsDB
        self.__credentials.delete_doc(_id)

        return "Deleted!"
