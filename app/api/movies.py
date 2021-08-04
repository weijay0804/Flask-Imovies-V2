'''

    movies API

'''


from flask import jsonify, request
from sqlalchemy.orm import query
from app.models import Movies
from . import api
from ..models import Movies


@api.route('/movies/')
def get_movies():
    movie_id = request.args.get('id')
    movie_limit = request.args.get('limit')

    if movie_id:
        movie = Movies.query.get_or_404(movie_id)
        print(movie_id)
        return jsonify({'movie' : movie.to_json()})

    elif movie_limit:
        movies = Movies.query.limit(movie_limit).all()
        return jsonify({'movies' : [movie.to_json() for movie in movies]})

    else:
        movies = Movies.query.all()
        print(movie_id)
        return jsonify({'movies' : [movie.to_json() for movie in movies]})
    
    
@api.route('/hot_movies')
def get_hot_movies():
    movies = Movies.query.filter((Movies.source == 'hot') | (Movies.source == 'top_hot')).all()
    return jsonify({'movies' : [movie.to_json() for movie in movies]})


@api.route('/top_movies')
def get_top_movies():
    movies = Movies.query.filter((Movies.source == 'top') | (Movies.source == 'top_hot')).order_by(Movies.rate.desc()).all()
    return jsonify({'movies' : [movie.to_json() for movie in movies]})



    