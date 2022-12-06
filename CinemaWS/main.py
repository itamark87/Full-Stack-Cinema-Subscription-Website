from flask import Flask
from flask_cors import CORS
import json
from bson import ObjectId

from routers.subscriptions_router import subscriptions
from routers.users_router import users
from routers.permissions_router import permissions
from routers.credentials_router import credentials
from routers.movies_router import movies
from routers.members_router import members
from routers.auth_router import auth


# Return every ObjectId from db as a string
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
CORS(app)


app.json_encoder = JSONEncoder


app.register_blueprint(subscriptions, url_prefix="/subscriptions/")
app.register_blueprint(users, url_prefix="/users/")
app.register_blueprint(permissions, url_prefix="/permissions/")
app.register_blueprint(credentials, url_prefix="/credentials/")
app.register_blueprint(movies, url_prefix="/movies/")
app.register_blueprint(members, url_prefix="/members/")
app.register_blueprint(auth, url_prefix="/auth/")


app.run(port=5001)
