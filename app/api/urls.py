'''

    設定 api url

'''

from flask_restful import Api

#----自訂函式----
from .movies import Movies, Movie, Trend_Movies, Top_Movies
from .users import Users, User, User_Movies, User_Watched_Movies
from . import api


api = Api(api)

# movies url
api.add_resource(Movies, '/movies/')
api.add_resource(Movie, '/movies/<int:id>/')
api.add_resource(Trend_Movies, '/trend/')
api.add_resource(Top_Movies, '/top/')


# users url
api.add_resource(Users, '/users/')
api.add_resource(User, '/users/<int:id>/')
api.add_resource(User_Movies, '/users/<int:id>/movies/')
api.add_resource(User_Watched_Movies, '/users/<int:id>/watched/')

