var singInBtn = document.querySelector('#login-btn')


singInBtn.addEventListener('click', loginUpcheck, false)




function loginUpcheck() {
    var emailStr = document.querySelector('#email').value
    var passwordStr = document.querySelector('#password').value


    if (emailStr.length == 0 | passwordStr.length == 0) {
        alert('資料不能為空')
        return false
    }

    var account = {}
    account.email = emailStr
    account.password = passwordStr
    var xhr = new XMLHttpRequest()
    xhr.open('post', '/auth/login', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    var data = JSON.stringify(account)
    xhr.send(data)
    xhr.onload = function() {
        var callbackData = JSON.parse(xhr.responseText)
        console.log(callbackData)
        var str = callbackData.message
    
        if (str == '登入失敗') {
            alert('登入失敗')
            emailStr = ''
        }
    
        else {
            alert('登入成功')
            // history.back()
            window.location = '/'
        }
    }
}