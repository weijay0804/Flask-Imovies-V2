'''

    main 視圖函式

'''


from app.models import Movies, User
from app.api.movies import Movie
from flask import render_template, request
from flask_login import login_required
#----自訂函式----
from . import main


@main.route('/')
def index():
    return render_template('main/index.html')

@main.route('/trend_movies')
def trend_movies():
    return render_template('main/hot_movies.html')

@main.route('/top_movies')
def top_moives():
    return render_template('main/top_movies.html')

@main.route('/movies/<int:id>')
def movie(id):
    ''' 特定電影頁面 '''
    movie = Movies.query.get_or_404(id)
    movie_type = movie.genre.replace(',', ', ')
    movie_start = movie.starts.replace(',', '、  ')
    movie_director = movie.director.replace(',', '、  ')
    movie_writers = movie.writers.replace(',', '、 ')
    return render_template('main/movie.html', movie = movie, movie_type = movie_type, movie_start = movie_start,
                        movie_director = movie_director, movie_writers = movie_writers)


@main.route('/user/<int:id>/movies')
@login_required
def user_movies(id):
    ''' 使用者收藏電影頁面 '''
    user = User.query.get_or_404(id)
    return render_template('user_movie/user_movies.html', user = user)

@main.route('/user/<int:id>/watched')
@login_required
def user_watched(id):
    ''' 使用者已觀看電影清單 '''
    user = User.query.get_or_404(id)
    return render_template('user_movie/user_watched.html', user = user)