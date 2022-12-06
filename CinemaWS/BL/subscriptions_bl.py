from DAL.subscriptions_WS_DAL import SubscriptionsWSDAL

# Subscriptions BL, responsible for all member-subscriptions actions logic


class SubscriptionsBL:

    def __init__(self):
        self.__subscriptions = SubscriptionsWSDAL()

    def get_all_subscriptions(self):
        data = self.__subscriptions.get_all_subscriptions()
        return data

    # A method available for users with movies actions permissions but no view members permission
    # Providing user with only member_id of members with subscriptions
    def get_partial_subscriptions_data(self):
        all_subscriptions = self.__subscriptions.get_all_subscriptions()
        partial_subscriptions = []
        for sub in all_subscriptions:
            new_sub = {key: sub[key] for key in ['_id', 'movies']}
            partial_subscriptions.append(new_sub)
        return partial_subscriptions

    def get_subscription(self, _id):
        subscription = self.__subscriptions.get_subscription(_id)
        return subscription

    def add_subscription(self, subscription):
        _id = self.__subscriptions.add_subscription(subscription)
        return _id

    def update_subscription(self, _id, subscription):
        subscription.pop("_id", None)
        self.__subscriptions.update_subscription(_id, subscription)
        return "Updated!"

    def delete_subscription(self, _id):
        self.__subscriptions.delete_subscription(_id)
        return "Deleted!"
