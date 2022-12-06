import json
import os
import sys

# Users DAL, responsible for reading and writing in json file users.json


class UsersFileDAL:
    def __init__(self):
        self.__path = os.path.join(sys.path[0], 'data/users.json')

    def read_file(self):
        with open(self.__path, 'r') as f:
            data = json.load(f)
            return data

    def write_file(self, data):
        with open(self.__path, 'w') as f:
            json.dump(data, f)



