'''

    使用者相關功能測試

'''

import unittest
from app import create_app, db
from app.models import User

class UserTestCase(unittest.TestCase):
    ''' 使用者功能測試 '''

    def setUp(self):
        ''' 參數初始化 '''
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        ''' 結束測試後刪除參數 '''
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_password_setter(self):
        ''' 測試有沒有執行密碼雜湊化 '''
        u = User(password = 'cat')
        self.assertTrue(u.verify_password is not None)

    def test_no_password_getter(self):
        ''' 測試是否能從外部存取密碼 '''
        u = User(password = 'cat')
        with self.assertRaises(AttributeError):
            u.password

    def test_password_verification(self):
        ''' 測試檢查密碼功能是否正確 '''
        u = User(password = 'cat')
        self.assertTrue(u.verify_password('cat'))
        self.assertFalse(u.verify_password('dog'))

    def test_password_salts_are_randon(self):
        ''' 測試加密函數的 salts 值是否是隨機'''
        u1 = User(password = 'cat')
        u2 = User(password = 'cat')
        self.assertFalse(u1.password_hash == u2.password_hash)

