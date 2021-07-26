'''

    app 初始化建構式

'''

from flask_sqlalchemy import SQLAlchemy
from flask import Flask

#----自訂函式----
from config import config


db = SQLAlchemy()


def create_app(config_name : str) -> Flask:
    ''' 根據不同的組態設定來建立 app '''

    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)

    # 註冊 main 藍圖
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    #註冊 api 藍圖
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_perfix = '/api/v1')

    return app


