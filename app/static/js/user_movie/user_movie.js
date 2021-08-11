var uid = sessionStorage.uid
var access_token = sessionStorage.access_token

var dataurl = `/api/v1/users/${uid}/movies`
        var xhr = new XMLHttpRequest()
        xhr.open('GET', dataurl, true)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.setRequestHeader("Authorization", `Bearer ${access_token}`)
        xhr.send()
        xhr.onload = function(){
            var dataset = JSON.parse(this.responseText)
            print(dataset)
        }

function print(dataset) {
    dataset['movies'].forEach( (data, index) => {
        let newCard = document.createElement('tr')
        let og_title = data.original_title
        
        if (og_title === null) {
            og_title = ''
        }
        else {
            og_title = `(${data.original_title})`
        }
        let rate = data.rate
        let rate_html = ``
        if (rate === null) {
            rate = ''
            rate_html = `
                <td class = 'movierate'>
                ${rate}
                </td>    
            `
        }

        else {
            rate_html = `
                <td class = 'movie-rate'>
                <img src="/static/image/star.png" width="7%">
                ${rate}
                </td> 
            `
        }

        

        newCard.className = 'infoCard'

        document.querySelector('#movies_contain').appendChild(newCard)


        let NewCardInfo = `
            <td class = 'number'>
                ${index + 1}
            </td>

            <td class = 'movie-image'>
                <img src = '${data.image}' width=20%>
            </td>

            <td class = 'movie-title'>
                <a href="/movies/${data.mid}">
                ${data.title} ${og_title}
            </td>
  
            <td class = 'movie-type'>${data.genre}</td>

            ${rate_html}

            <td class = 'add-btn'>
                <button onclick='add_movie(${data.mid})' type="button" class="btn btn-info" id="movie-add">
                    <img src = '../../static/image/add-button.png'>
                </button>
                <button onclick='remove_movie(${data.mid})' type="button" class="btn btn-info" id="movie-remove">
                    <img src = '../../static/image/remove.png'>
                </button>
            </td>
        `   


        newCard.innerHTML = NewCardInfo
    })
}


var csrftoken = document.querySelector('meta[name = "csrf-token"]').getAttribute('content') // 取得 csrf token


function add_movie(mid) {
    var movie_id = mid

    var account = {}

    account.mid = movie_id

    var xhr = new XMLHttpRequest()

    xhr.open('post', `/api/v1/users/${uid}/watched/`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${access_token}`)

    var data = JSON.stringify(account)

    xhr.send(data)

    xhr.onload = function() {
        var callback = JSON.parse(this.responseText)
        if (callback.status)
        {
            alert('加入成功')
            parent.location.reload()
        }

        else 
        {
            alert('加入失敗')
        }
    }  
}




function remove_movie(mid) {
    var movie_id = mid

    var account = {}

    account.mid = movie_id

    var xhr = new XMLHttpRequest()

    xhr.open('delete', `/api/v1/users/${uid}/movies/`)

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.setRequestHeader("Authorization", `Bearer ${access_token}`)

    var data = JSON.stringify(account)

    xhr.send(data)

    xhr.onload = function() {
        var callback = JSON.parse(this.responseText)
        if (callback.status)
        {
            alert('刪除成功')

           parent.location.reload()


        }
    }  
}