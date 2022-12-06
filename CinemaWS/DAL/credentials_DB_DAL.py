from pymongo import MongoClient
from bson import ObjectId


class CredentialsDBDAL:

    def __init__(self):
        connection_str = "******"
        self.__client = MongoClient(connection_str)
        self.__db = self.__client["credentials"]
        self.__col = self.__db['credentials']

    def get_whole_collection(self):
        data = list(self.__col.find({}))
        return data

    def get_doc_by_username(self, username):
        doc = self.__col.find_one({'username': username})
        return doc

    def get_doc(self, _id):
        doc = self.__col.find_one({'_id': ObjectId(_id)})
        return doc

    def add_doc(self, doc):
        self.__col.insert_one(doc)
        return doc['_id']

    def update_doc(self, _id, doc):
        self.__col.update_one({"_id": ObjectId(_id)}, {"$set": doc})
        return "Updated!"

    def update_element(self, _id, element, value):
        self.__col.update_one({"_id": ObjectId(_id)}, {"$set": {element: value}})
        return "Updated!"

    def delete_doc(self, _id):
        self.__col.delete_one({"_id": ObjectId(_id)})
        return "Deleted!"





