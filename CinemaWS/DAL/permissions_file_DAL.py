import json
import os
import sys

# Permissions DAL, responsible for reading and writing in json file permissions.json


class PermissionsFileDAL:
    def __init__(self):
        self.__path = os.path.join(sys.path[0], 'data/permissions.json')

    def read_file(self):
        with open(self.__path, 'r') as f:
            data = json.load(f)
            return data

    def write_file(self, data):
        with open(self.__path, 'w') as f:
            json.dump(data, f)



