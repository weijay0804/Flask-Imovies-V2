'''

    main 藍圖中的錯誤處理函式

'''

from flask import render_template

#----自訂函式----
from . import main

@main.app_errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404

@main.app_errorhandler(500)
def internal_server_error(e):
    return render_template('error/500.hmtl'), 500

