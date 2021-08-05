var singUpBtn = document.querySelector('#singUp')


singUpBtn.addEventListener('click', signUpcheck, false)




function signUpcheck() {
    var emailStr = document.querySelector('#email').value
    var passwordStr = document.querySelector('#password').value
    var usernameStr = document.querySelector('#username').value
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
        if (str == '成功') {
            alert('註冊成功')
            history.back()
        }
        else {
            alert('註冊失敗')
        }
    }

}

