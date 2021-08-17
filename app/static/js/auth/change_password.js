import { alert_users } from "../module/alert.js"
import { header_datas } from "../module/header_datas.js"

var singUpBtn = document.querySelector('#change') // 選取登入按鈕


singUpBtn.addEventListener('click', signUpcheck, false) // 監聽登入按鈕


var csrftoken = document.querySelector('meta[name = "csrf-token"]').getAttribute('content') // 取得 csrf token

// 當按下按鈕後要執行的動作
function signUpcheck() {
    // 取得表單的資料
    var old_passwordStr = document.querySelector('#old_password').value
    var new_passwordStr = document.querySelector('#new_password').value
    var check_passwordStr = document.querySelector('#check_new_password').value

    // 檢查輸入的資料服不符合規定
    if (old_passwordStr.length == 0 | new_passwordStr.length == 0 | check_passwordStr.length == 0) {
        alert_users('資料不能為空')
        return false
    }

    if (new_passwordStr !== check_passwordStr ) {
        alert_users('密碼不相同')
        return false
    }

    // 將表單中的資料存成一個物件
    var account = {}

    account.old_password = old_passwordStr
    account.new_password = new_passwordStr


    // 定義 xhr 物件
    var xhr = new XMLHttpRequest()

    // 使用 post 方法送出
    xhr.open('put', `/api/v1/users/${header_datas.uid}/`, true)

    // 設定 headers
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", header_datas.csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${header_datas.access_token}`)

    // 將資料轉為 json 格式
    var data = JSON.stringify(account)

    // 送出請求
    xhr.send(data)

    // 伺服器回傳資料
    xhr.onload = function() {
        var callbackData = JSON.parse(xhr.responseText)

        if (callbackData.status) {
            alert_users('更改成功', 500)
            setTimeout("window.location = '/'", 500)
            
            
        }
        else 
        {
            if (callbackData.message == 'password_error') 
            {
                alert_users('密碼錯誤')
                return false
            }

            alert_users('更改失敗')
            return false
            
        }
    }
}