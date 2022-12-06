from flask import Blueprint, request, make_response
from BL.auth_bl import AuthBL

# This router is in charge of authentication only, using AuthBL for logic

auth = Blueprint('auth', __name__)

auth_bl = AuthBL()


@auth.route("/login/", methods=['POST'])
def login():

    if "username" not in request.json or "password" not in request.json\
            or not request.json["username"] or not request.json["password"]:
        return make_response({'error': "Credentials are missing"}, 400)

    username = request.json["username"]
    password = request.json["password"]

    resp = auth_bl.authenticate(username, password)
    return make_response(resp, 401 if "error" in resp.keys() else 200)


@auth.route("/create/", methods=['POST'])
def create_account():

    if "username" not in request.json or "password" not in request.json\
            or not request.json["username"] or not request.json["password"]:
        return make_response({'error': "Credentials are missing"}, 400)

    username = request.json["username"]
    password = request.json["password"]

    resp = auth_bl.create_account(username, password)
    if resp:
        return make_response(resp, 201)
    else:
        return make_response({'error': "Creating an account failed"}, 401)




