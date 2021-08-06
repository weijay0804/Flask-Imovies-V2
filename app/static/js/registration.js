var singUpBtn = document.querySelector('#signUp')


singUpBtn.addEventListener('click', signUpcheck, false)




function signUpcheck() {
    var emailStr = document.querySelector('#email').value
    var passwordStr = document.querySelector('#password').value
    var check_passwordStr = document.querySelector('#check_password').value
    var usernameStr = document.querySelector('#username').value

    if (emailStr.length == 0 | passwordStr.length == 0 | usernameStr.length == 0) {
        alert('資料不能為空')
        return false
    }

    if (passwordStr !== check_passwordStr ) {
        alert('密碼密須相同')
        return false
    }

    console.log(emailStr)
    var account = {}
    account.email = emailStr
    account.password = passwordStr
    account.username = usernameStr
    var xhr = new XMLHttpRequest()
    xhr.open('post', '/api/v1/users/', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    var data = JSON.stringify(account)
    xhr.send(data)
    xhr.onload = function() {
        var callbackData = JSON.parse(xhr.responseText)
        var str = callbackData.message
        if (str == 'email已被使用') {
            alert('email已被使用')
        }
        else if (str == '使用者名稱已被使用') {
            alert('使用者名稱已被使用')
        }

        else {
            alert('註冊成功')
            history.back()
        }
    }

}

