''' 

    app 基本的單元測試

'''

import unittest
from flask import current_app
from app import create_app, db

class BasicTestCase(unittest.TestCase):
    ''' 基本測試類別 '''

    def setUp(self):
        ''' 建立 app 環境 '''

        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        ''' 結束測試設定 '''

        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_app_exists(self):
        ''' 測試 app 是否存在 '''

        self.assertFalse(current_app is None)

    def test_app_is_testing(self):
        ''' 測試 app 是否使用 test 設定值 '''

        self.assertTrue(current_app.config['TESTING'])