import { get_datas_auth, get_datas_no_auth } from "../module/requests.js"
import { header_datas } from "../module/header_datas.js"
import { print_user_movies } from "../module/rendering.js"


var xhr = get_datas_auth(`/api/v1/users/${header_datas.uid}/movies`, header_datas)

xhr.onload = function(){
    var dataset = JSON.parse(this.responseText)
    print_user_movies(dataset)
}

window.add_movie = add_movie
window.remove_movie = remove_movie



function add_movie(mid) {
    var movie_id = mid

    var account = {}

    account.mid = movie_id

    var xhr = new XMLHttpRequest()

    xhr.open('post', `/api/v1/users/${header_datas.uid}/watched/`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", header_datas.csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${header_datas.access_token}`)

    var data = JSON.stringify(account)

    xhr.send(data)

    xhr.onload = function() {
        var callback = JSON.parse(this.responseText)
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
    var movie_id = mid

    var account = {}

    account.mid = movie_id

    var xhr = new XMLHttpRequest()

    xhr.open('delete', `/api/v1/users/${header_datas.uid}/movies/`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", header_datas.csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${header_datas.access_token}`)

    var data = JSON.stringify(account)

    xhr.send(data)

    xhr.onload = function() {
        var callback = JSON.parse(this.responseText)
        if (callback.status)
        {
            alert_movies('刪除成功')
            setTimeout('parent.location.reload()', 500)

        }
    }  
}

window.del = del

function alert_movies(e, t = 1000) {
    let alert_block = document.querySelector('.flash-movies')
    let alert_html = `
        <div class="alert alert-dark" role="alert">
           ${e}
        </div>
        `
    alert_block.innerHTML = alert_html

    del_alert(t)
}

function del() {
    let alert_block = document.querySelector('.flash-movies')
    alert_block.innerHTML = ''
}

function del_alert(t) {
    setTimeout('del()', t)
}