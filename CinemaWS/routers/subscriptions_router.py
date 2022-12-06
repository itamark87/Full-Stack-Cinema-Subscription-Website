from flask import Blueprint, jsonify, request, make_response
from BL.subscriptions_bl import SubscriptionsBL
from BL.auth_bl import AuthBL

# This router is in charge of getting, adding, updating and deleting data of subscriptions of members,
# using SubscriptionBL for logic

subscriptions = Blueprint('subscriptions', __name__)
subscriptions_bl = SubscriptionsBL()

auth = Blueprint('auth', __name__)
auth_bl = AuthBL()


@subscriptions.route("/", methods=['GET'])
def get_all_subscriptions():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "View Members")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    resp['data'] = subscriptions_bl.get_all_subscriptions()
    return make_response(resp, 200)


@subscriptions.route("/partial/", methods=['GET'])
def get_partial_subscriptions_data():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Delete Movies")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    resp['data'] = subscriptions_bl.get_partial_subscriptions_data()
    return make_response(resp, 200)


@subscriptions.route("/<_id>", methods=['GET'])
def get_subscription(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    permissions = auth_bl.check_permissions(token)
    if 'View Members' not in permissions:
        return make_response({"error": "Unauthorized Request"}, 401)
    sub = subscriptions_bl.get_subscription(_id)
    return jsonify(sub)


@subscriptions.route("/", methods=['POST'])
def add_subscription():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Update Members")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    obj = request.json
    resp['data'] = subscriptions_bl.add_subscription(obj)
    return make_response(resp, 200)


@subscriptions.route("/<_id>", methods=['PUT'])
def update_subscription(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, ["Update Members", "Delete Members", "Delete Movies"])
    if 'error' in resp.keys():
        return make_response(resp, 401)
    obj = request.json
    resp['data'] = subscriptions_bl.update_subscription(_id, obj)
    return make_response(resp, 200)


@subscriptions.route("/<_id>", methods=['DELETE'])
def delete_subscription(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, ["Update Members", "Delete Members", "Delete Movies"])
    if 'error' in resp.keys():
        return make_response(resp, 401)
    resp['data'] = subscriptions_bl.delete_subscription(_id)
    return make_response(resp, 200)



