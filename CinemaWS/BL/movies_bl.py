from DAL.movies_WS_DAL import MoviesWSDAL
from DAL.subscriptions_WS_DAL import SubscriptionsWSDAL

# Movies BL, responsible for all movies actions logic


class MoviesBL:

    def __init__(self):
        self.__movies = MoviesWSDAL()
        self.__subscriptions = SubscriptionsWSDAL()

    def get_all_movies(self):
        data = self.__movies.get_all_movies()
        return data

    # A method available for users with members actions permissions but no view movies permission
    # Providing user with movies names only
    def get_movies_names(self):
        all_movies = self.__movies.get_all_movies()
        movies_names = []
        for movie in all_movies:
            new_movie = {key: movie[key] for key in ['_id', 'name']}
            movies_names.append(new_movie)
        return movies_names

    def get_movie(self, _id):
        movie = self.__movies.get_movie(_id)
        return movie

    def add_movie(self, movie):
        _id = self.__movies.add_movie(movie)
        return _id

    def update_movie(self, _id, movie):
        movie.pop("_id", None)
        self.__movies.update_movie(_id, movie)
        return "Updated!"

    def delete_movie(self, _id):
        self.__movies.delete_movie(_id)
        return "Deleted!"
