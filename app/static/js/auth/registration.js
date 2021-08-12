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
        alert_user('資料不能為空')
        return false
    }

    if (passwordStr !== check_passwordStr ) {
        alert_user('密碼密須相同')
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

        if (callbackData.status) {
            alert_user('註冊成功', 500)
            setTimeout("window.location = '/'", 500)
            
            
        }
        else 
        {
            if (callbackData.message == 'exist_username') 
            {
                alert_user('使用者名稱已被使用')
                return false
            }

            if (callbackData.message == 'exist_email')
            {
                alert_user('email已被使用')
                return false
            }
            
        }
    }
}

function alert_user(e, t = 1000) {
    let alert_block = document.querySelector('.flash-user')
    let alert_html = `
        <div class="alert alert-dark" role="alert">
           ${e}
        </div>
        `
    alert_block.innerHTML = alert_html

    del_alert(t)
}

function del() {
    let alert_block = document.querySelector('.flash-user')
    alert_block.innerHTML = ''
}

function del_alert(t) {
    setTimeout('del()', t)
}

