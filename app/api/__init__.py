'''

    imovies API 藍圖建立

'''

from flask import Blueprint

api = Blueprint('api', __name__)

from . import movies, user, errors, authentication

