'''

    main 視圖函式

'''

from flask import render_template

#----自訂函式----
from . import main


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/trend_movies')
def trend_movies():
    return render_template('hot_movies.html')

    

