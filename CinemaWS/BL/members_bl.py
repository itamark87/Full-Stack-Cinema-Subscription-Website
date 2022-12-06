from DAL.members_WS_DAL import MembersWSDAL
from DAL.subscriptions_WS_DAL import SubscriptionsWSDAL

# Members BL, responsible for all members actions logic


class MembersBL:

    def __init__(self):
        self.__members = MembersWSDAL()
        self.__subscriptions = SubscriptionsWSDAL()

    def get_all_members(self):
        data = self.__members.get_all_members()
        return data

    def get_member(self, _id):
        member = self.__members.get_member(_id)
        return member

    def add_member(self, member):
        _id = self.__members.add_member(member)
        return _id

    def update_member(self, _id, member):
        member.pop("_id", None)
        self.__members.update_member(_id, member)
        return "Updated!"

    def delete_member(self, _id):
        self.__members.delete_member(_id)
        return "Deleted!"
