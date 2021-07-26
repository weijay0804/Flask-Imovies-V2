'''

    imovies 主程式

'''

import os
from flask_migrate import Migrate

#----自訂函式----
from app import create_app, db
from app.models import Movies

app = create_app(os.environ.get('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return dict(db = db, Movies = Movies)

