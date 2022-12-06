from flask import Blueprint, jsonify, request, make_response

from BL.movies_bl import MoviesBL
from BL.auth_bl import AuthBL

# This router is in charge of getting, adding, updating and deleting data of movies, using MoviesBL for logic

auth = Blueprint('auth', __name__)
auth_bl = AuthBL()

movies = Blueprint('movies', __name__)
movies_bl = MoviesBL()


@movies.route("/", methods=['GET'])
def get_all_movies():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "View Movies")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    resp['data'] = movies_bl.get_all_movies()
    return make_response(resp, 200)


@movies.route("/names/", methods=['GET'])
def get_movies_names():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "View Members")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    movies_names = movies_bl.get_movies_names()
    resp['data'] = movies_names
    return make_response(resp, 200)


@movies.route("/<_id>", methods=['GET'])
def get_movie(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    permissions = auth_bl.check_permissions(token)
    if 'View Movies' not in permissions:
        return make_response({"error": "Unauthorized Request"}, 401)
    movie = movies_bl.get_movie(_id)
    return jsonify(movie)


@movies.route("/", methods=['POST'])
def add_movie():
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Create Movies")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    obj = request.json
    resp['data'] = movies_bl.add_movie(obj)
    return make_response(resp, 200)


@movies.route("/<_id>", methods=['PUT'])
def update_movie(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Update Movies")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    obj = request.json
    resp['data'] = movies_bl.update_movie(_id, obj)
    return make_response(resp, 200)


@movies.route("/<_id>", methods=['DELETE'])
def delete_movie(_id):
    if not request.headers or not request.headers.get('x-access-token'):
        return make_response({"error": "Cannot fulfill request without token"}, 401)
    token = request.headers.get('x-access-token')
    resp = auth_bl.check_permission_refresh_token(token, "Delete Movies")
    if 'error' in resp.keys():
        return make_response(resp, 401)
    resp['data'] = movies_bl.delete_movie(_id)
    return make_response(resp, 200)
