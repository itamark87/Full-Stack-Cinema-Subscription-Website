from DAL.subscriptions_DB_DAL import SubscriptionsDBDAL

# Members BL, responsible for all members actions logic


class MembersBL:
    def __init__(self):
        self.__members = SubscriptionsDBDAL()

    def get_all_members(self):
        data = self.__members.get_whole_collection('members')
        return data

    def get_member(self, _id):
        member = self.__members.get_doc('members', _id)
        return member

    def add_member(self, member):
        _id = self.__members.add_doc('members', member)
        return _id

    def update_member(self, _id, member):
        self.__members.update_doc('members', _id, member)
        return "Updated!"

    def delete_member(self, _id):
        self.__members.delete_doc('members', _id)
        return "Deleted!"
