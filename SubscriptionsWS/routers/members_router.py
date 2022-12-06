from flask import Blueprint, jsonify, request
from BL.members_bl import MembersBL

# This router is in charge of getting, adding, updating and deleting data of members, using MembersBL for logic

members = Blueprint('members', __name__)

members_bl = MembersBL()


@members.route("/", methods=['GET'])
def get_all_members():
    all_members = members_bl.get_all_members()
    return jsonify(all_members)


@members.route("/<_id>/", methods=['GET'])
def get_member(_id):
    member = members_bl.get_member(_id)
    return jsonify(member)


@members.route("/", methods=['POST'])
def add_member():
    obj = request.json
    result = members_bl.add_member(obj)
    return jsonify(result)


@members.route("/<_id>", methods=['PUT'])
def update_member(_id):
    obj = request.json
    result = members_bl.update_member(_id, obj)
    return jsonify(result)


@members.route("/<_id>", methods=['DELETE'])
def delete_member(_id):
    result = members_bl.delete_member(_id)
    return jsonify(result)
