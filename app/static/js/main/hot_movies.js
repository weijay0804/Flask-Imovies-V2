import { get_datas_no_auth, post_datas, update_access_token } from "../module/requests.js"
import { print_movies } from "../module/rendering.js"
import { header_datas } from "../module/header_datas.js"
import { check_user_movies } from "../module/check.js"

var datas = get_datas_no_auth('/api/v1/trend/') // 使用 get 取得電影資料


// 解析回傳的電影資料
datas.onload = function(){
    var dataset = JSON.parse(this.responseText)
    console.log(dataset['movies'][0].title)
    print_movies(dataset)
}

// 將電影新增至使用者電影清單
function add_movie(mid) {

    header_datas.access_token = sessionStorage.access_token

    var uid = sessionStorage.uid
    if (uid === undefined)
    {
        window.location = '/auth/login'
        return false
    }
    
    var movie_id = mid

    var send_datas = {}

    send_datas.mid = movie_id

    // 使用 post 方式將電影資料送出
    var datas = post_datas(`/api/v1/users/${uid}/movies/`, send_datas, header_datas)

    // 解析回傳資料
    datas.onload = function()
    {
        // TODO 自動再送出一次 post
        var check_reslut = check_user_movies(datas)
        // 檢查 token 有沒有過期
        if (check_reslut === 'expired')
        {   
            update_access_token(header_datas)
        }
    }
}

window.add_movie = add_movie

