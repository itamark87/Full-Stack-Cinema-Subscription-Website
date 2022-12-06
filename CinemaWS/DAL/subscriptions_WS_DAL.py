import requests

# Subscriptions DAL, responsible for interaction with Subscriptions Web Service regarding members-subscriptions


class SubscriptionsWSDAL:
    def __init__(self):
        self.__url = "http://127.0.0.1:5000/subscriptions"

    def get_all_subscriptions(self):
        resp = requests.get(self.__url)
        return resp.json()

    def get_subscription(self, _id):
        resp = requests.get(self.__url + "/" + _id)
        return resp.json()

    def add_subscription(self, obj):
        resp = requests.post(self.__url, json=obj)
        return resp.json()

    def update_subscription(self, _id, obj):
        resp = requests.put(self.__url + "/" + _id, json=obj)
        return resp.json()

    def delete_subscription(self, _id):
        resp = requests.delete(self.__url + "/" + _id)
        return resp.json()
