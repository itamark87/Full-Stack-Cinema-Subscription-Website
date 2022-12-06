from flask import Blueprint, jsonify, request
from BL.movies_bl import MoviesBL

# This router is in charge of getting, adding, updating and deleting data of movies, using MoviesBL for logic


movies = Blueprint('movies', __name__)

movies_bl = MoviesBL()


@movies.route("/", methods=['GET'])
def get_all_movies():
    subs = movies_bl.get_all_movies()
    return jsonify(subs)


@movies.route("/<_id>/", methods=['GET'])
def get_movie(_id):
    sub = movies_bl.get_movie(_id)
    return jsonify(sub)


@movies.route("/", methods=['POST'])
def add_movie():
    obj = request.json
    result = movies_bl.add_movie(obj)
    return jsonify(result)


@movies.route("/<_id>", methods=['PUT'])
def update_movie(_id):
    obj = request.json
    result = movies_bl.update_movie(_id, obj)
    return jsonify(result)


@movies.route("/<_id>", methods=['DELETE'])
def delete_movie(_id):
    result = movies_bl.delete_movie(_id)
    return jsonify(result)
