'''

    電影資源節點

'''

from flask import jsonify,request
from flask_restful import Resource

#----自訂函式----
from ..models import Movies as Movies_mod


class Movies(Resource):
    ''' 電影資源 '''

    def get(self):
        ''' 取得所有電影 '''

        movies = Movies_mod.query.all()
        return jsonify({'movies' : [movie.to_json() for movie in movies]})

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

        if request.args.get('limit'):
            movies = Movies_mod.query.filter(( Movies_mod.source == 'hot' ) | ( Movies_mod.source == 'top_hot' )).limit(request.args.get('limit')).all()
        
        else:
            movies = Movies_mod.query.filter(( Movies_mod.source == 'hot' ) | ( Movies_mod.source == 'top_hot' )).all()
    
        return jsonify({'movies' : [movie.to_json() for movie in movies]})




class Top_Movies(Resource):
    ''' Top 250 電影資源'''

    def get(self):
        ''' 取得所有 TOP 250 電影 '''

        if request.args.get('limit'):
            movies = Movies_mod.query.filter(( Movies_mod.source == 'top' ) | ( Movies_mod.source == 'top_hot' )).limit(request.args.get('limit')).all()
        
        else:
            movies = Movies_mod.query.filter(( Movies_mod.source == 'top' ) | ( Movies_mod.source == 'top_hot' )).all()
    
        return jsonify({'movies' : [movie.to_json() for movie in movies]})



