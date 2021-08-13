'''

    使用者視圖

'''



from flask import render_template, redirect, request, url_for, flash,jsonify, session
from flask_jwt_extended.view_decorators import jwt_required
from flask_login import login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token, get_jwt_identity, create_refresh_token
from .forms import LoginForm, RegistrationForm, ChangePasswordForm


#-------自訂函式--------
from app import check_email
from . import auth
from .. import db
from ..models import User


@auth.route('/refresh', methods = ['POST'])
@jwt_required(refresh=True)
def refresh():
    ''' 刷新 access token '''
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity, fresh=False)
    
    return jsonify({'access_token' : access_token})


@auth.route('/login', methods = ['GET', 'POST'])
def login():
    '''使用者登入視圖'''
    if request.method == 'POST':
        email = request.json.get('email')

        if not check_email(email):
            return jsonify({'status' : False, 'message' : 'format_error'})

        password = request.json.get('password')

        user = User.query.filter_by(email = email).first()

        if user is None or not user.verify_password(password):
            return jsonify({'status' : False})
        
        login_user(user)

        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)


        return jsonify({'status' : True, 'uid' : user.id, 'access_token' : access_token, 'refresh_token' : refresh_token})

    return render_template('auth/login.html')


@auth.route('/logout')
@login_required
def logout():
    '''使用者登出視圖'''

    logout_user()
    flash('你已經成功登出')

    return render_template('auth/logout.html')



@auth.route('/registration', methods = ['GET'])
def registration():
    '''使用者註冊視圖'''
 
    return render_template('auth/registration.html')




@auth.route('/change-password', methods = ['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.old_password.data):
            current_user.password = form.password.data
            db.session.add(current_user)
            db.session.commit()
            flash('您的密碼變更成功')
            return redirect(url_for('main.index'))
        else:
            flash('密碼錯誤')
    return render_template('auth/change_password.html', form = form)





