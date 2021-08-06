'''

    使用者視圖

'''



from flask import render_template, redirect, request, url_for, flash,jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from .forms import LoginForm, RegistrationForm, ChangePasswordForm


#-------自訂函式--------
from . import auth
from .. import db
from ..models import User




@auth.route('/login', methods = ['GET', 'POST'])
def login():
    '''使用者登入視圖'''
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')

        user = User.query.filter_by(email = email).first()

        if user is None:
            return jsonify({'message' : '登入失敗'})
        if not user.verify_password(password):
            return jsonify({'message' : '登入失敗'})
        
        session['username'] = user.username
        session['uid'] = user.id
        return jsonify({'message' : '登入成功', 'username' : user.username, 'uid' : user.id})

    return render_template('auth/login.html')


@auth.route('/logout')
@login_required
def logout():
    '''使用者登出視圖'''

    logout_user()
    flash('你已經成功登出')

    return redirect(url_for('main.index'))



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





