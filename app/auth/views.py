'''

    使用者視圖

'''



from flask import render_template, redirect, request, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from .forms import LoginForm, RegistrationForm, ChangePasswordForm


#-------自訂函式--------
from . import auth
from .. import db
from ..models import User


@auth.route('/login', methods = ['GET', 'POST'])
def login():
    '''使用者登入視圖'''

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email = form.email.data).first()        #依表單email資料去資料庫撈取使用者

        if user is not None and user.verify_password(form.password.data):   #如果使用者不是None和使用者密碼正確，就登入
            login_user(user, form.remember_me.data)
            next = request.args.get('next')                                 #之前想訪問的視圖涵式

            if next is None or not next.startswith('/'):                    #確保next裡的url是相對url
                next = url_for('main.index')

            return redirect(next) 
        flash('錯誤的使用者名稱或密碼')
        
    return render_template('auth/login.html', form = form)


@auth.route('/logout')
@login_required
def logout():
    '''使用者登出視圖'''

    logout_user()
    flash('你已經成功登出')

    return redirect(url_for('main.index'))



@auth.route('/registration', methods = ['GET', 'POST'])
def registration():
    '''使用者註冊視圖'''

    form = RegistrationForm()           # 定義註冊表單

    if form.validate_on_submit():
        user = User(email = form.email.data, username = form.username.data,
                    password = form.password.data)

        db.session.add(user)
        db.session.commit()

        flash('註冊成功')

        return redirect(url_for('main.index'))
    
    return render_template('auth/registration.html', form = form)




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





