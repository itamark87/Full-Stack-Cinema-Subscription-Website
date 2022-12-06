from DAL.subscriptions_DB_DAL import SubscriptionsDBDAL

# Subscriptions BL, responsible for all member-subscriptions actions logic


class SubscriptionsBL:
    def __init__(self):
        self.__subscriptions = SubscriptionsDBDAL()

    def get_all_subscriptions(self):
        data = self.__subscriptions.get_whole_collection('subscriptions')
        return data

    def get_subscription(self, _id):
        subscription = self.__subscriptions.get_doc('subscriptions', _id)
        return subscription

    def add_subscription(self, subscription):
        _id = self.__subscriptions.add_doc('subscriptions', subscription)
        return _id

    def update_subscription(self, _id, subscription):
        print(_id, subscription)
        self.__subscriptions.update_doc('subscriptions', _id, subscription)
        return "Updated!"

    def delete_subscription(self, _id):
        self.__subscriptions.delete_doc('subscriptions', _id)
        return "Deleted!"
