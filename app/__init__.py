'''

    app 初始化建構式

'''

from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_login import LoginManager
from flask_bootstrap import Bootstrap
from flask_jwt_extended import JWTManager
from flask_wtf.csrf import CSRFProtect

#----自訂函式----
from config import config


bootstrap = Bootstrap()
db = SQLAlchemy()
jwt = JWTManager()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
crsf = CSRFProtect()


def create_app(config_name : str) -> Flask:
    ''' 根據不同的組態設定來建立 app '''

    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)
    login_manager.init_app(app)
    bootstrap.init_app(app)
    jwt.init_app(app)
    crsf.init_app(app)
    
    # 註冊 main 藍圖
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # 註冊 auth 藍圖
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix = '/auth')


    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix = '/api/v1')

    return app


