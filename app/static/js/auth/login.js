var singInBtn = document.querySelector('#login-btn') // 選取登入按鈕


singInBtn.addEventListener('click', loginUpcheck, false) // 監聽登入按鈕

var csrftoken = document.querySelector('meta[name = "csrf-token"]').getAttribute('content') // 取得 csrf token



// 當按下按鈕後要執行的動作
function loginUpcheck() {
    // 取得表單的資料
    var emailStr = document.querySelector('#email').value
    var passwordStr = document.querySelector('#password').value

    // 檢查輸入的資料服不符合規定
    if (emailStr.length == 0 | passwordStr.length == 0) {
        alert('資料不能為空')
        return false
    }

    // 將表單中的資料存成一個物件
    var account = {}
    account.email = emailStr
    account.password = passwordStr

    // 定義 xhr 物件
    var xhr = new XMLHttpRequest()

    // 使用 post 方法送出
    xhr.open('post', '/auth/login', true)

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
        console.log(callbackData)
        var str = callbackData.message
        var uid = callbackData.uid
        var access_token = callbackData.access_token

        // TODO 改成用 cookie 儲存
        sessionStorage.uid = uid // 將使用者 id 儲存到 session storage 中
        sessionStorage.access_token = access_token
        if (str == false) {
            alert('登入失敗')
            emailStr = ''
        }
    
        else {
            
            // history.back()
            window.location = '/'
            alert('登入成功')
        }
    }
}

function alert(e) {
    var content = document.querySelector('.flash-content')
    var alert_html = `
        <div class="alert alert-dark" role="alert">
            ${e}
        </div>
    `
    content.innerHTML = alert_html
}