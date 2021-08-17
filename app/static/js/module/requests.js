// 送出請求函式庫


// 不需要認證的請求
export function get_datas_no_auth(url) 
{
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send()
    return xhr
}

// 需要認證的請求
export function get_datas_auth(url, header_datas)
{
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("Authorization", `Bearer ${header_datas.access_token}`)
    xhr.send()
    return xhr
}

// 使用 post 送出資料
export function post_delete_datas(method, url, send_datas, header_datas)
{
    var xhr = new XMLHttpRequest()

    xhr.open(method, url)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", header_datas.csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${header_datas.access_token}`)

    var data = JSON.stringify(send_datas)

    xhr.send(data)

    return xhr
}

// 更新 access_token 
export function update_access_token(header_datas)
{

    var xhr1 = new XMLHttpRequest()
    xhr1.open('post', `/auth/refresh`)

    xhr1.setRequestHeader('Content-type', 'application/json')
    xhr1.setRequestHeader("X-CSRFToken", header_datas.csrftoken)
    xhr1.setRequestHeader("Authorization", `Bearer ${header_datas.refresh_token}`)

    xhr1.send()
    return false
}