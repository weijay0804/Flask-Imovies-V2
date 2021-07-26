'''

    資料庫模型定義

'''

from app import db

#----自訂函式----
from .imovies_module import open_file


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