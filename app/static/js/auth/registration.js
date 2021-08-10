var singUpBtn = document.querySelector('#signUp') // 選取登入按鈕


singUpBtn.addEventListener('click', signUpcheck, false) // 監聽登入按鈕


var csrftoken = document.querySelector('meta[name = "csrf-token"]').getAttribute('content') // 取得 csrf token

// 當按下按鈕後要執行的動作
function signUpcheck() {
    // 取得表單的資料
    var emailStr = document.querySelector('#email').value
    var passwordStr = document.querySelector('#password').value
    var check_passwordStr = document.querySelector('#check_password').value
    var usernameStr = document.querySelector('#username').value

    // 檢查輸入的資料服不符合規定
    if (emailStr.length == 0 | passwordStr.length == 0 | usernameStr.length == 0) {
        alert('資料不能為空')
        return false
    }

    if (passwordStr !== check_passwordStr ) {
        alert('密碼密須相同')
        return false
    }

    // 將表單中的資料存成一個物件
    var account = {}
    account.email = emailStr
    account.password = passwordStr
    account.username = usernameStr

    // 定義 xhr 物件
    var xhr = new XMLHttpRequest()

    // 使用 post 方法送出
    xhr.open('post', '/api/v1/users/', true)

    // 設定 headers
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", csrftoken)

    // 將資料轉為 json 格式
    var data = JSON.stringify(account)

    // 送出請求
    xhr.send(data)

    // 伺服器回傳資料
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
            // history.back()
            window.location = '/'
        }
    }

}

