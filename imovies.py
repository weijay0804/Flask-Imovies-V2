'''

    imovies 主程式

'''

import os
from flask_migrate import Migrate, upgrade

#----自訂函式----
from app import create_app, db
from app.models import Movies, User

app = create_app(os.environ.get('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return dict(db = db, Movies = Movies, User = User)

@app.cli.command()
def test():
    ''' 啟動單元測試 '''
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

@app.cli.command()
def deploy():
    ''' 在部屬前設定資料庫 '''
    # 更新資料庫
    upgrade()

    # 更新資料庫電影
    Movies.insert_movies_datas('hot')
    Movies.insert_movies_datas('top')

    


