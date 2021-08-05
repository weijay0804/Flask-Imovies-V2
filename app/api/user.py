'''

    users 的資源端點

'''

import re
from flask import jsonify, request
from ..models import User, db
from . import api
from .authentication import auth


@api.route('/users/', methods = ['GET'])
def get_users():
    ''' 取得所有使用者 '''

    if request.args.get('limit'):
        users = User.query.limit(request.args.get('limit')).all()
    else:
        users = User.query.all()
    return jsonify({'users' : [user.to_json() for user in users]})

@api.route('/users/', methods = ['POST'])
def add_user():
    ''' 新增使用者 '''

    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')

    if User.query.filter_by(email = email).first():
        return jsonify({'message' : 'email已被使用'})
    if User.query.filter_by(username = username).first():
        return jsonify({'message' : '使用者名稱已被使用'})
    
    user = User(email = email, username = username, password = password)

    db.session.add(user)
    db.session.commit()
    return jsonify({'message' : '成功'})


@api.route('/users/<int:id>/', methods = ['GET'])
def get_user(id):
    ''' 依照 user id 取得使用者'''

    user = User.query.get_or_404(id)
    return jsonify(user.to_json())




@api.route('/users/<int:id>/movies/', methods = ['GET'])
@auth.login_required
def get_user_moives_url(id):
    ''' 取得使用者收藏的電影 '''

    user = User.query.get_or_404(id)
    movies = user.movies.all()

    return jsonify({'movies' : [movie.to_json() for movie in movies ]})

@api.route('/users/<int:id>/watched_movies/', methods = ['GET'])
def get_user_watched_movies_url(id):
    ''' 取得使用者已觀看電影 '''

    user = User.query.get_or_404(id)
    movies = user.watched_movies.all()
    
    return jsonify({'movies' : [movie.to_json() for movie in movies ]})
