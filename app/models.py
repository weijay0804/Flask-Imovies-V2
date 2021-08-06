'''

    資料庫模型定義

'''

from app import db
from flask import url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


#----自訂函式----
from .imovies_module import open_file
from . import login_manager


#建立User與Movie的中間表(電影清單)
user_movie = db.Table('user_movie',
                        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                        db.Column('movie_id', db.Integer, db.ForeignKey('movies.id'))
                    )

#建立User與Movie的中間表(已觀看電影清單)
user_watched_movie = db.Table('user_watched_movie',
                        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                        db.Column('movie_id', db.Integer, db.ForeignKey('movies.id'))
                    )


class Movies(db.Model):
    '''Movies 資料表'''

    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key = True)
    imdb_id  = db.Column(db.String(20), nullable = False, unique = True)
    title = db.Column(db.String(50), nullable = False)
    og_title = db.Column(db.String(50))
    rate = db.Column(db.Float)
    year = db.Column(db.SmallInteger)
    grade = db.Column(db.String(20))
    time_length = db.Column(db.String(20))
    genre = db.Column(db.String(100))
    description = db.Column(db.String(2000))
    director = db.Column(db.String(100))
    writers = db.Column(db.String(150))
    starts = db.Column(db.String(150))
    image = db.Column(db.String(1000))
    crawler_time = db.Column(db.DateTime)
    source = db.Column(db.String(50))

    def to_json(self):
        ''' 將資料轉換成 json 格式 '''
        json_movies = {
            'url' : url_for('api.movie', id = self.id),
            'imdb_id' : self.imdb_id,
            'title' : self.title,
            'original_title' : self.og_title,
            'rate' : self.rate,
            'year' : self.year,
            'grade' : self.grade,
            'movie_time' : self.time_length,
            'genre' : self.genre,
            'description' : self.description,
            'writers' : self.writers,
            'starts' : self.starts,
            'image' : self.image,
            'source' : self.source,
        }

        return json_movies

    @staticmethod
    def insert_movies_datas(movies_source : str):
        '''
        
            新增電影資料到資料庫 
            (movies_source = 'top') -> 新增 top250 電影到資料庫
            (movies_source = 'hot) -> 新增熱門電影到資料庫

        '''

        if movies_source == 'top':

            datas = open_file('movies_datas/top_movies_ch2.json')

        elif movies_source == 'hot':
            datas = open_file('movies_datas/hot_movie_ch2.json')

        else:
            return '輸入錯誤 hot or top'

        for data in datas:
            
            # 檢查電影的 年分、分級、時間，如果長度為 2 代表分級為 None
            if len(data['movie_year_grade_time']) == 3:
                year = data['movie_year_grade_time'][0]
                grade = data['movie_year_grade_time'][1]
                time_length = data['movie_year_grade_time'][-1]

            if len(data['movie_year_grade_time']) == 2:
                year = data['movie_year_grade_time'][0]
                grade = None
                time_length = data['movie_year_grade_time'][-1]

            # 依照電影標題撈取資料庫中的資料
            movie = Movies.query.filter_by(title = data['movie_title']).first()

            # 如果電影不在資料庫中，則存入資料庫
            if movie is None:
                movie = Movies(imdb_id = data['movie_id'], title = data['movie_title'],
                                og_title = data['movies_OG_title'], rate = data['movie_rate'],
                                year = year, grade = grade, time_length = time_length,
                                genre = ','.join(data['movie_type']), description = data['movie_description'],
                                director = ','.join(data['director']), writers = ','.join(data['writers']),
                                starts = ','.join(data['start']), image = data['movie_img'],
                                crawler_time = data['time'], source = 'top' if movies_source == 'top' else 'hot')
                   
                db.session.add(movie)

            # 如果電影已經存在資料庫並且標籤為 top 並且輸入資料為 top 則更新爬取時間
            elif movie.source == 'top' and movies_source == 'top':
                movie.crawler_time = data['time']
                db.session.add(movie)

            # 如果電影已經存在資料庫且標籤為 hot 並且輸入資料為 top 則跟新標籤為 top_hot
            elif movie.source == 'hot' and movies_source == 'top':
                movie.source = 'top_hot'
                movie.crawler_time = data['time']
                db.session.add(movie)

             # 如果電影已經存在資料庫並且標籤為 hot 並且輸入資料為 hot 則更新爬取時間
            elif movie.source == 'hot' and movies_source == 'hot':
                movie.crawler_time = data['time']
                db.session.add(movie)

            # 如果電影已經存在資料庫且標籤為 top 並且輸入資料為 hot 則跟新標籤為 top_hot
            elif movie.source == 'top' and movies_source == 'hot':
                movie.source = 'top_hot'
                movie.crawler_time = data['time']
                db.session.add(movie)

        db.session.commit()


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(64), unique = True, index = True)
    email = db.Column(db.String(64), unique = True, index = True)
    password_hash = db.Column(db.String(128))
    movies = db.relationship('Movies', secondary = user_movie, 
                                    backref = db.backref('users', lazy = 'dynamic'),
                                    lazy = 'dynamic')
    watched_movies = db.relationship('Movies', secondary = user_watched_movie, 
                                    backref = db.backref('watched_users', lazy = 'dynamic'),
                                    lazy = 'dynamic')

    def to_json(self):
        json_post = {
            'url' : url_for('api.user', id = self.id),
            'username' : self.username,
            'movies' : url_for('api.user_movies', id = self.id),
            'watched_movies' : url_for('api.user_watched_movies', id = self.id),
        }

        return json_post

    '''使用者密碼處理區域開始'''

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    '''使用者密碼處理區域結束'''

    def save_session(self):
        session['username'] = self.username
        session['uid'] = self.id

    @staticmethod
    def remove_seesion():
        session['username'] = ''
        session['uid'] = ''

 

    def __repr__(self):
        return '<User %r>' % self.username

@login_manager.user_loader
def load_user(user_id):
    '''載入使用者的涵式'''
    return User.query.get(int(user_id))
