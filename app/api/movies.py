'''

    電影資源節點

'''


from flask import jsonify,request, current_app, url_for
from flask_restful import Resource

#----自訂函式----
from ..models import Movies as Movies_mod


class Movies(Resource):
    ''' 電影資源 '''

    def get(self):
        ''' 取得所有電影 '''

        page = request.args.get('page', 1, type = int) # 取得 url 中的 page 參數，如果沒有則從 1 開始
        # 從資料庫撈取資料 每次撈取 20 筆
        pagination = Movies_mod.query.paginate(page, per_page = current_app.config['IMOVIE_MOVIES_PER_PAGE'], error_out = False)
        movies = pagination.items # 取得撈取出來的資料
        prev = None # 上一頁

        # 如果有上一頁
        if pagination.has_prev:
            prev = url_for('api.movies', page = page - 1)
        
        next = None # 下一頁
        if pagination.has_next:
            next = url_for('api.movies', page = page + 1)


        return jsonify({
            'movies' : [movie.to_json() for movie in movies],
            'prev_url' : prev,
            'next_url' : next,
            'count' : pagination.total,
            })

class Movie(Resource):
    ''' 特定電影資源 '''

    def get(self, id):
        ''' 根據 movie id 取得特定電影'''

        movie = Movies_mod.query.get_or_404(id)
        return jsonify(movie.to_json())


class Trend_Movies(Resource):
    ''' 熱門電影資源 '''

    def get(self):
        ''' 獲得所有熱門電影資源 '''

        page = request.args.get('page', 1, type = int) # 取得 url 中的 page 參數，如果沒有則從 1 開始
        # 從資料庫撈取資料 每次撈取 20 筆
        pagination = Movies_mod.query.filter(( Movies_mod.source == 'hot' ) | ( Movies_mod.source == 'top_hot' )).paginate(page, per_page = current_app.config['IMOVIE_MOVIES_PER_PAGE'], error_out = False)
        movies = pagination.items # 取得撈取出來的資料
        prev = None # 上一頁

        # 如果有上一頁
        if pagination.has_prev:
            prev = url_for('main.trend_movies', page = page - 1)
        
        next = None # 下一頁
        if pagination.has_next:
            next = url_for('main.trend_movies', page = page + 1)


        return jsonify({
            'movies' : [movie.to_json() for movie in movies],
            'prev_url' : prev,
            'next_url' : next,
            'count' : pagination.total,
            })




class Top_Movies(Resource):
    ''' Top 250 電影資源'''

    def get(self):
        ''' 取得所有 TOP 250 電影 '''

      
        movies = Movies_mod.query.filter(( Movies_mod.source == 'top' ) | ( Movies_mod.source == 'top_hot' )).all()
    
        return jsonify({'movies' : [movie.to_json() for movie in movies]})



