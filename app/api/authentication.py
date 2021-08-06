'''

    api 的使用者驗證

'''

from flask import g
from flask_httpauth import HTTPBasicAuth

#----自訂函式----
from ..models import User
from .errors import unauthorized, forbidden


auth = HTTPBasicAuth() # 初始化

@auth.verify_password
def verify_password(email : str, password : str) -> bool:
    ''' 依照 email 驗證使用者密碼 '''
    
    # 檢查有沒有傳入 email 引數
    if email == '':
        return False
    
    # 從資料庫撈取使用者
    user = User.query.filter_by(email = email).first()

    # 檢查使用者存不存在
    if not user:
        return False
    
    g.current_user = user # 將使用者存入 g context 中，讓 view 函式可以取用

    return user.verify_password(password)


@auth.error_handler
def auth_error():
    ''' 當身分驗證無效時，回傳訊息(使用 json 格式) '''

    return unauthorized('Invalid credentilas. ')
