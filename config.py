'''

    app 設定檔

'''

from dotenv import load_dotenv
import os
import datetime

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:

    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=15)

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    IMOVIE_MOVIES_PER_PAGE = 20
    JSON_AS_ASCII = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DB_HOST = os.environ.get('DB_HOST')
    DB_PORT = os.environ.get('DB_PORT')
    DB_USER = os.environ.get('DB_USER')
    DB_POSSWORD = os.environ.get('DB_PASSWORD')
    DB_NAME = os.environ.get('DB_NAME')

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI') or f'mysql+pymysql://{DB_USER}:{DB_POSSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'


class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URI') or 'sqlite://'


class ProductionConfig(Config):
    # 替換 heroku 資料庫路徑
    if os.environ.get('DATABASE_URL'):
        database_url = os.environ.get('DATABASE_URL').replace('postgres', 'postgresql')
    else:
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


config = {
    'development' : DevelopmentConfig,
    'testing' : TestConfig,
    'production' : ProductionConfig,
    'default' : DevelopmentConfig,
}