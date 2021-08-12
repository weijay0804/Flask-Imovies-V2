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
            alert_movies('加入成功')
           
        }
        else 
        {
            if (callback.message == 'exist')
            {
                alert_movies('已存在電影清單中', 2000)
               
                return false
            }

            else if (callback.message == 'exist_watched')
            {
                alert_movies('你已經看過這個電影', 2000)
                
                return false
            }

            alert_movies('加入失敗')
           
        }
    }
}

function alert_movies(e, t = 1000) {
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