'''

    movies 的資源端點

'''

from ..models import Movies
from flask import jsonify,request
from . import api


@api.route('/movies/')
def get_movies():
    ''' 取得所有電影 '''

    if request.args.get('limit'):

        movies = Movies.query.limit(request.args.get('limit')).all()
    else:

        movies = Movies.query.all()
    return jsonify({'movies' : [movie.to_json() for movie in movies]})


@api.route('/movies/<int:id>/')
def get_movie(id):
    ''' 依照 movie id 取得電影'''
    movie = Movies.query.get_or_404(id)
    return jsonify(movie.to_json())


@api.route('/trend_movies/')
def get_trend_movies():
    ''' 取得熱門電影 '''

    if request.args.get('limit'):
        movies = Movies.query.filter(( Movies.source == 'hot' ) | ( Movies.source == 'top_hot' )).limit(request.args.get('limit')).all()
    else:
        movies = Movies.query.filter(( Movies.source == 'hot' ) | ( Movies.source == 'top_hot' )).all()
    
    return jsonify({'movies' : [movie.to_json() for movie in movies]})


@api.route('/top_movies/')
def get_top_movies():
    ''' 取得 TOP 250 電影 '''

    if request.args.get('limit'):
        movies = Movies.query.filter(( Movies.source == 'top' ) | ( Movies.source == 'top_hot') ).limit(request.args.get('limit')).all()
    
    else:
        movies = Movies.query.filter(( Movies.source == 'top') | ( Movies.source == 'top_hot' )).all()
    return jsonify({'movies' : [movie.to_json() for movie in movies]})






