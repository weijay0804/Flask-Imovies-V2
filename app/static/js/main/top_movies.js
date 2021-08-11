var dataurl = '/api/v1/top250/'
        var xhr = new XMLHttpRequest()
        xhr.open('GET', dataurl, true)
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
                <button onclick='add_movie(${data.mid})' type="button" class="btn btn-info" id="movie-add" title = '新增到電影清單'>
                    <img src = '../../static/image/plus.png'>
                </button>
            </td>
        `   

        newCard.innerHTML = NewCardInfo
    })
}


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
