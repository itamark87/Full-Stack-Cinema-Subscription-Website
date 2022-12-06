import requests

# Movies DAL, responsible for interaction with Subscriptions Web Service regarding movies


class MoviesWSDAL:
    def __init__(self):
        self.__url = "http://127.0.0.1:5000/movies"

    def get_all_movies(self):
        resp = requests.get(self.__url)
        return resp.json()

    def get_movie(self, _id):
        resp = requests.get(self.__url + "/" + _id)
        return resp.json()

    def add_movie(self, obj):
        resp = requests.post(self.__url, json=obj)
        return resp.json()

    def update_movie(self, _id, obj):
        resp = requests.put(self.__url + "/" + _id, json=obj)
        return resp.json()

    def delete_movie(self, _id):
        resp = requests.delete(self.__url + "/" + _id)
        return resp.json()
