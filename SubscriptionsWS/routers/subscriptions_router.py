from flask import Blueprint, jsonify, request
from BL.subscriptions_bl import SubscriptionsBL

# This router is in charge of getting, adding, updating and deleting data of subscriptions of members,
# using SubscriptionBL for logic


subscriptions = Blueprint('subscriptions', __name__)

subscriptions_bl = SubscriptionsBL()


@subscriptions.route("/", methods=['GET'])
def get_all_subscriptions():
    subs = subscriptions_bl.get_all_subscriptions()
    return jsonify(subs)


@subscriptions.route("/<_id>/", methods=['GET'])
def get_subscription(_id):
    sub = subscriptions_bl.get_subscription(_id)
    return jsonify(sub)


@subscriptions.route("/", methods=['POST'])
def add_subscription():
    obj = request.json
    result = subscriptions_bl.add_subscription(obj)
    return jsonify(result)


@subscriptions.route("/<_id>/", methods=['PUT'])
def update_subscription(_id):
    obj = request.json
    result = subscriptions_bl.update_subscription(_id, obj)
    return jsonify(result)


@subscriptions.route("/<_id>", methods=['DELETE'])
def delete_subscription(_id):
    result = subscriptions_bl.delete_subscription(_id)
    return jsonify(result)
