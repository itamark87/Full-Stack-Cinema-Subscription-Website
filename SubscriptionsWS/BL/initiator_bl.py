import requests
from DAL.subscriptions_DB_DAL import SubscriptionsDBDAL

# Initiator BL, responsible for initiating the DB on first run
# Fetching data from jsonplaceholder and tvmaze webservices


class InitiatorBL:

    def __init__(self):
        self.__members_url = "https://jsonplaceholder.typicode.com/users"
        self.__movies_url = "https://api.tvmaze.com/shows"
        self.__db = SubscriptionsDBDAL()

    def get_and_store_data(self):

        list_of_collections = self.__db.get_collections_names()

        # Check that members collection does not exist
        if 'members' not in list_of_collections:

            # Get members data from jsonplaceholder
            resp = requests.get(self.__members_url)
            members_data = resp.json()

            # Filter only needed fields
            members = []
            for elem in members_data:
                member = {}
                member['name'] = elem['name']
                member['email'] = elem['email']
                member['city'] = elem['address']['city']
                members.append(member)

            # Store data in DB
            self.__db.add_whole_collection("members", members)

        # Check that movies collection does not exist
        if 'movies' not in list_of_collections:

            # Get movies data from tvmaze
            resp = requests.get(self.__movies_url)
            movies_data = resp.json()

            # Filter only needed fields
            movies = []
            for elem in movies_data:
                movie = {}
                movie['name'] = elem['name']
                movie['genres'] = elem['genres']
                movie['image'] = elem['image']['medium']
                movie['premiered'] = elem['premiered']
                movies.append(movie)

            # Store data in DB
            self.__db.add_whole_collection("movies", movies)

