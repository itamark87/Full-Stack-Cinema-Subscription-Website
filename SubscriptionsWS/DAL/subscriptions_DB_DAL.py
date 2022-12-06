from pymongo import MongoClient
from bson import ObjectId

# Subscriptions DAL, responsible for interaction with Subscriptions DB regarding members, movies and subscriptions


class SubscriptionsDBDAL:

    def __init__(self):
        connection_str = "*****"
        self.__client = MongoClient(connection_str)
        self.__db = self.__client["subscriptions"]

    def get_collections_names(self):
        col_names = self.__db.list_collection_names()
        return col_names

    def add_whole_collection(self, col, data):
        collection = self.__db[col]
        collection.insert_many(data)

    def get_whole_collection(self, col):
        collection = self.__db[col]
        data = list(collection.find({}))
        return data

    def get_doc(self, col, _id):
        collection = self.__db[col]
        doc = collection.find_one({'_id': ObjectId(_id)})
        return doc

    def add_doc(self, col, doc):
        collection = self.__db[col]
        collection.insert_one(doc)
        return doc['_id']

    def update_doc(self, col, _id, doc):
        collection = self.__db[col]
        collection.update_one({"_id": ObjectId(_id)}, {"$set": doc})
        return "Updated!"

    def delete_doc(self, col, _id):
        collection = self.__db[col]
        collection.delete_one({"_id": ObjectId(_id)})
        return "Deleted!"




