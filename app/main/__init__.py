'''
    建立 main 的藍圖

'''


from flask import Blueprint

main = Blueprint('main', __name__)

from . import view, errors # 從同級目錄匯入 view 和 errors 並避免循環匯入

