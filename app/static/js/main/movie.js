import { alert_users } from "../module/alert.js"
import { header_datas } from "../module/header_datas.js"
import { update_access_token } from "../module/requests.js"

window.add_movie = add_movie

function add_movie(mid) {
    var uid = header_datas.uid
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
    xhr.setRequestHeader("X-CSRFToken", header_datas.csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${header_datas.access_token}`)

    var data = JSON.stringify(account)

    xhr.send(data)

    xhr.onload = function() {
        var callback = JSON.parse(xhr.responseText)

        if (xhr.status == 401)
        {
            update_access_token(header_datas)
            parent.location.reload() // FIXME 改成重新發送請求

            return false
        }

        if (callback.status)
        {
            alert_users('加入成功')
           
        }
        else 
        {
            if (callback.message == 'exist')
            {
                alert_users('已存在電影清單中', 2000)
               
                return false
            }

            else if (callback.message == 'exist_watched')
            {
                alert_users('你已經看過這個電影', 2000)
                
                return false
            }

            alert_users('加入失敗')
           
        }
    }
}
