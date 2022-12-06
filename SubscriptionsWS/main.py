from flask import Flask
import json
from bson import ObjectId

from BL.initiator_bl import InitiatorBL

from routers.subscriptions_router import subscriptions
from routers.movies_router import movies
from routers.members_router import members


# Return every ObjectId from db as a string
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)


app.json_encoder = JSONEncoder


app.register_blueprint(subscriptions, url_prefix="/subscriptions")
app.register_blueprint(movies, url_prefix="/movies")
app.register_blueprint(members, url_prefix="/members")

db_initiator = InitiatorBL()
# Initiate data in DB from external web services if data does not exist yet
db_initiator.get_and_store_data()

app.run()
