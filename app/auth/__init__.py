'''

    建立 使用者 藍圖

'''

from flask import Blueprint

auth = Blueprint('auth', __name__)

from . import forms, views

