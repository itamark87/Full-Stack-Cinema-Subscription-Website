from DAL.subscriptions_DB_DAL import SubscriptionsDBDAL

# Movies BL, responsible for all movies actions logic


class MoviesBL:
    def __init__(self):
        self.__movies = SubscriptionsDBDAL()

    def get_all_movies(self):
        data = self.__movies.get_whole_collection('movies')
        return data

    def get_movie(self, _id):
        movie = self.__movies.get_doc('movies', _id)
        return movie

    def add_movie(self, movie):
        _id = self.__movies.add_doc('movies', movie)
        return _id

    def update_movie(self, _id, movie):
        self.__movies.update_doc('movies', _id, movie)
        return "Updated!"

    def delete_movie(self, _id):
        self.__movies.delete_doc('movies', _id)
        return "Deleted!"
