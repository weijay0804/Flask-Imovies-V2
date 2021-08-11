var csrftoken = document.querySelector('meta[name = "csrf-token"]').getAttribute('content') // 取得 csrf token

function add_movie(mid) {
    var uid = sessionStorage.uid
    var access_token = sessionStorage.access_token
    if (uid === undefined)
    {
        window.location = '/auth/login'
        return false
    }
    
    var movie_id = mid

    var account = {}

    account.mid = movie_id

    var xhr = new XMLHttpRequest()

    xhr.open('post', `/api/v1/users/${uid}/movies/`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${access_token}`)

    var data = JSON.stringify(account)

    xhr.send(data)

    xhr.onload = function() {
        var callback = JSON.parse(xhr.responseText)
        if (callback.status)
        {
            alert('加入成功')
        }
        else 
        {
            if (callback.message == 'exist')
            {
                alert('已存在')
                return false
            }

            else if (callback.message == 'exist_watched')
            {
                alert('已看過')
                return false
            }

            alert('加入失敗')
        }
    }
}