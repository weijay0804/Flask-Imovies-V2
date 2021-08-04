'''

    users 的資源端點

'''

from flask import jsonify, request
from ..models import User
from . import api
from .authentication import auth


@api.route('/users/')
def get_users():
    ''' 取得所有使用者 '''

    if request.args.get('limit'):
        users = User.query.limit(request.args.get('limit')).all()
    else:
        users = User.query.all()
    return jsonify({'users' : [user.to_json() for user in users]})


@api.route('/users/<int:id>/')
def get_user(id):
    ''' 依照 user id 取得使用者'''

    user = User.query.get_or_404(id)
    return jsonify(user.to_json())


@api.route('/users/<int:id>/movies/')
@auth.login_required
def get_user_moives_url(id):
    ''' 取得使用者收藏的電影 '''

    user = User.query.get_or_404(id)
    movies = user.movies.all()

    return jsonify({'movies' : [movie.to_json() for movie in movies ]})

@api.route('/users/<int:id>/watched_movies/')
def get_user_watched_movies_url(id):
    ''' 取得使用者已觀看電影 '''

    user = User.query.get_or_404(id)
    movies = user.watched_movies.all()
    
    return jsonify({'movies' : [movie.to_json() for movie in movies ]})
