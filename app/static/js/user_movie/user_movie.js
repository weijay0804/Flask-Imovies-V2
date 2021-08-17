import { get_datas_auth, post_delete_datas } from "../module/requests.js"
import { update_access_token } from "../module/requests.js"
import { header_datas } from "../module/header_datas.js"
import { print_user_movies } from "../module/rendering.js"
import { alert_movies } from "../module/alert.js"

// header_datas.access_token = sessionStorage.access_token
var url = window.location.href
if (url.indexOf('page') != -1)
{
    var page = url.split('page=')[1]
    var xhr = get_datas_auth(`/api/v1/users/${header_datas.uid}/movies?page=${page}`, header_datas) // 使用 get 取得電影資料
}
else
{
    var xhr = get_datas_auth(`/api/v1/users/${header_datas.uid}/movies`, header_datas) // 使用 get 取得電影資料
}

xhr.onload = function(){
    
    var dataset = JSON.parse(this.responseText)
    if (xhr.status == 401)
    {
        update_access_token(header_datas)
        parent.location.reload() // FIXME 改成重新發送請求
        return false
    }
    print_user_movies(dataset, 'user_movies')
}

window.add_movie = add_movie
window.remove_movie = remove_movie



function add_movie(mid) {
    var movie_id = mid

    var account = {}

    account.mid = movie_id

    var xhr = post_delete_datas('post', `/api/v1/users/${header_datas.uid}/watched/`, account, header_datas)

    xhr.onload = function() {
        // header_datas.access_token = sessionStorage.access_token
        var callback = JSON.parse(this.responseText)
        if (xhr.status == 401)
        {
            alert_movies('登入逾時')
            update_access_token(header_datas)
            parent.location.reload() // FIXME 改成重新發送請求            
            return false
        }
        
        if (callback.status)
        {
            alert_movies('加入成功')
            setTimeout('parent.location.reload()', 500)
            
        }

        else 
        {
            alert_movies('加入失敗')
        }
    }  
}




function remove_movie(mid) {
    // header_datas.access_token = sessionStorage.access_token
    var movie_id = mid

    var account = {}

    account.mid = movie_id

    var xhr = post_delete_datas('delete', `/api/v1/users/${header_datas.uid}/movies/`, account, header_datas)

    xhr.onload = function() {
        var callback = JSON.parse(this.responseText)
        if (xhr.status == 401)
        {   
            alert_movies('登入逾時')
            update_access_token(header_datas)
            parent.location.reload() // FIXME 改成重新發送請求
            return false
        }
        if (callback.status)
        {
            alert_movies('刪除成功')
            setTimeout('parent.location.reload()', 500)

        }
    }  
}

