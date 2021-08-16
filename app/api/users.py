'''

    使用者資源節點

'''


import re
from flask import jsonify, request, url_for, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required
import jwt

#----自訂函式----
from app import check_email
from .authentication import auth
from ..models import Movies, User as User_mod
from ..models import Movies as Movies_mod
from ..models import db



class Users(Resource):
    ''' 使用者資源 '''

    def get(self):
        ''' 獲得所有使用者 '''

        if request.args.get('limit'):
            users = User_mod.query.limit(request.args.get('limit')).all()
        
        else:
            users = User_mod.query.all()

        return jsonify({'users' : [user.to_json() for user in users]})

    def post(self):
        ''' 新增使用者 '''

        
        email = request.json.get('email')
        if not check_email(email):
            return jsonify({'status' : False, 'message' : 'format_error'})

        if User_mod.query.filter_by(email = email).first():
            return jsonify({'status' : False, 'message' : 'exist_email'})

        username = request.json.get('username')
        if User_mod.query.filter_by(username = username).first():
            return jsonify({'status' : False, 'message' : 'exist_username'})
        

        password = request.json.get('password')
        print(request.headers)

        
        
        user = User_mod(email = email, username = username, password = password)

        db.session.add(user)
        db.session.commit()
        
        return jsonify({'status' : True})



class User(Resource):
    ''' 特定使用者資源 '''

    def get(self, id):
        ''' 根據使用者 id 獲得使用者 '''

        user = User_mod.query.get_or_404(id)
        return jsonify(user.to_json())


class User_Movies(Resource):
    ''' 使用者收藏電影資源 '''
    
    @jwt_required()
    def get(self, id):
        ''' 取得使用者收藏的電影 '''

        user = User_mod.query.get_or_404(id)
        page = request.args.get('page', 1, type = int) # 取得 url 中的 page 參數，如果沒有則從 1 開始
        # 從資料庫撈取資料 每次撈取 20 筆
        pagination = user.movies.paginate(page, per_page = current_app.config['IMOVIE_MOVIES_PER_PAGE'], error_out = False)
        movies = pagination.items # 取得撈取出來的資料
        prev = None # 上一頁

        # 如果有上一頁
        if pagination.has_prev:
            prev = url_for('main.user_movies', page = page - 1, id = user.id)
        
        next = None # 下一頁
        if pagination.has_next:
            next = url_for('main.user_movies', page = page + 1, id = user.id)


        return jsonify({
            'movies' : [movie.to_json() for movie in movies],
            'prev_url' : prev,
            'next_url' : next,
            'count' : pagination.total,
            })

    
    @jwt_required()
    def post(self, id):
        ''' 使用者新增電影到電影清單 '''
        mid = request.json.get('mid')
        user = User_mod.query.get_or_404(id)

        movie = Movies_mod.query.get_or_404(mid)

        user_movies = user.movies.all()

        user_watched = user.watched_movies.all()

        if movie in user_movies:
            return jsonify({'status' : False, 'message' : 'exist'})

        if movie in user_watched:
            return jsonify({'stauts' : False, 'message' : 'exist_watched'})

        user.movies.append(movie)

        db.session.commit()

        return jsonify({'status' : True})

    @jwt_required()
    def delete(self, id):
        ''' 刪除使用者電影清單中的電影 '''
        mid = request.json.get('mid')
        user = User_mod.query.get_or_404(id)
        movie = Movies_mod.query.get_or_404(mid)
        user.movies.remove(movie)
        db.session.commit()

        return jsonify({'status' : True})

        


class User_Watched_Movies(Resource):
    ''' 使用者已觀看電影資源 '''

    @jwt_required()
    def get(self, id):
        ''' 取得使用者已經觀看的電影 '''

        user = User_mod.query.get_or_404(id)
        page = request.args.get('page', 1, type = int) # 取得 url 中的 page 參數，如果沒有則從 1 開始
        # 從資料庫撈取資料 每次撈取 20 筆
        pagination = user.watched_movies.paginate(page, per_page = current_app.config['IMOVIE_MOVIES_PER_PAGE'], error_out = False)
        movies = pagination.items # 取得撈取出來的資料
        prev = None # 上一頁

        # 如果有上一頁
        if pagination.has_prev:
            prev = url_for('main.user_watched', page = page - 1, id = user.id)
        
        next = None # 下一頁
        if pagination.has_next:
            next = url_for('main.user_watched', page = page + 1, id = user.id)


        return jsonify({
            'movies' : [movie.to_json() for movie in movies],
            'prev_url' : prev,
            'next_url' : next,
            'count' : pagination.total,
            })

    @jwt_required()
    def post(self, id):
        ''' 新增電影到以觀看清單 '''
        mid = request.json.get('mid')
        user  = User_mod.query.get_or_404(id)
        movie = Movies_mod.query.get_or_404(mid)

        user.watched_movies.append(movie)
        user.movies.remove(movie)
        db.session.commit()

        return jsonify({'status' : True})

    @jwt_required()
    def delete(self, id):
        ''' 刪除使用者已觀看電影裡的電影 -> 退回到電影清單 '''
        mid = request.json.get('mid')
        user = User_mod.query.get_or_404(id)
        movie = Movies_mod.query.get_or_404(mid)

        print(user.movies.all())
        user.movies.append(movie)
        print(user.movies.all())
        print(user.watched_movies.all())
        user.watched_movies.remove(movie)
        print(user.watched_movies.all())
        
        db.session.commit()

        return jsonify({'status' : True})





