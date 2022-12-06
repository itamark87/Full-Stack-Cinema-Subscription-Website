from DAL.permissions_file_DAL import PermissionsFileDAL


class PermissionsBL:
    def __init__(self):
        self.__permissions = PermissionsFileDAL()

    def get_all_permissions(self):
        data = self.__permissions.read_file()
        return data["permissions"]

    def get_permission(self, _id):
        data = self.__permissions.read_file()
        permissions = data["permissions"]
        arr = list(filter(lambda x: x["_id"] == _id, permissions))
        return arr[0]

    def add_permission(self, permission):
        print(permission)
        data = self.__permissions.read_file()
        permissions = data["permissions"]
        permissions.append(permission)
        obj = {"permissions": permissions}
        self.__permissions.write_file(obj)
        return "Created!"

    def update_permission(self, _id, permission):
        data = self.__permissions.read_file()
        permissions = data["permissions"]
        for i in range(len(permissions)):
            if permissions[i]["_id"] == int(_id):
                permissions[i] = permission
                break

        obj = {"permissions": permissions}
        self.__permissions.write_file(obj)
        return "Updated!"

    def delete_permissions(self, _id):
        index = 0
        data = self.__permissions.read_file()
        permissions = data["permissions"]
        for i in range(len(permissions)):
            if permissions[i]["_id"] == int(_id):
                index = i
                break

        permissions.pop(index)
        obj = {"permissions": permissions}
        self.__permissions.write_file(obj)
        return "Deleted!"
