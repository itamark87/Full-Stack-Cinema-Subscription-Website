from flask import Blueprint, jsonify, request, make_response
from BL.members_bl import MembersBL
from BL.auth_bl import AuthBL

# This router is in charge of getting, adding, updating and deleting data of members, using MembersBL for logic

members = Blueprint('members', __name__)
members_bl = MembersBL()

auth = Blueprint('auth', __name__)
auth_bl = AuthBL()


@members.route("/", methods=['GET'])
def get_all_members():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "View Members")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    all_members = members_bl.get_all_members()
    resp['data'] = all_members
    return make_response(resp, 200)


@members.route("/<_id>", methods=['GET'])
def get_member(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    permissions = auth_bl.check_permissions(token)
    if 'View Members' not in permissions:
        return make_response({"error": "Unauthorized Request"}, 401)
    member = members_bl.get_member(_id)
    return jsonify(member)


@members.route("/", methods=['POST'])
def add_member():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Create Members")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    obj = request.json
    resp['data'] = members_bl.add_member(obj)
    return make_response(resp, 200)


@members.route("/<_id>", methods=['PUT'])
def update_member(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Update Members")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    obj = request.json
    resp['data'] = members_bl.update_member(_id, obj)
    return make_response(resp, 200)


@members.route("/<_id>", methods=['DELETE'])
def delete_member(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Delete Members")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    resp['data'] = members_bl.delete_member(_id)
    return make_response(resp, 200)

