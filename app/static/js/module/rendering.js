// 渲染 html 函式庫

// 渲染 trend 、 top 電影頁面
export function print_movies(dataset)
{
    // 取得目前頁數 沒有的話就設為 1
    var current_url = window.location.href
    if (current_url.indexOf('page') != -1)
    {
        var page_number = Number(current_url.split('page=')[1])
    }
    else
    {
        var page_number = 1
    }

    // 取得 div class = page
    var page = document.querySelector('.page')

    // 判斷是否有前一頁
    if (dataset.prev_url != null)
    {
        var prev_link_css = ''
        var prev_link_html = `<a class="page-link" href="${dataset.prev_url}">&laquo;</a>`
        var prev_html = `<li class="page-item" ><a class="page-link" href="/trend_movies?page=${page_number-1}">${page_number-1}</a></li>`
    }

    else
    {
        var prev_link_css = 'disabled'
        var prev_link_html = `<span class="page-link">&laquo;</span>`
        var prev_html = '<li class="page-item"></li>'
    }

    // 判斷是否有下一頁
    if (dataset.next_url != null)
    {
        var next_link_css = ''
        var next_link_html = `<a class="page-link" href="${dataset.next_url}">&raquo;</a>`
        var next_html = `<li class="page-item" ><a class="page-link" href="/trend_movies?page=${page_number+1}">${page_number+1}</a></li>`
    }

    else
    {
        var next_link_css = 'disabled'
        var next_link_html = `<span class="page-link">&raquo;</span>`
        var next_html = '<li class="page-item"></li>'
    }

    // 渲染 html
    let paginate_html = `
        <nav aria-label="...">
            <ul class="pagination">
                <li class="page-item ${prev_link_css}">
                    ${prev_link_html}
                </li>
                ${prev_html}
                <li class="page-item active"><a class="page-link" href="/trend_movies?page=${page_number}">${page_number}</a></li>
                ${next_html}
                <li class="page-item ${next_link_css}">
                   ${next_link_html}
                </li>
            </ul>
        </nav>
    `
    page.innerHTML = paginate_html

    // 處理電影資料
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

// 渲染 user movies watched movies
export function print_user_movies(dataset, type)
{
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

        if (type == 'watched')
        {
            var btn_html = `
            <td class = 'add-btn'>
                <button onclick='remove_movie(${data.mid})' type="button" class="btn btn-info" id="movie-remove" title = '刪除電影'>
                    <img src = '../../static/image/remove.png'>
                </button>
            </td>
            `
        }

        else if (type == 'user_movies')
        {
            var btn_html = `
            <td class = 'add-btn'>
                <button onclick='add_movie(${data.mid})' type="button" class="btn btn-info" id="movie-add" title = '新增到已觀看電影'>
                    <img src = '../../static/image/plus.png'>
                </button>
                <button onclick='remove_movie(${data.mid})' type="button" class="btn btn-info" id="movie-remove" title = '刪除電影'>
                    <img src = '../../static/image/remove.png'>
                </button>
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

            ${btn_html}
        `   


        newCard.innerHTML = NewCardInfo
    })
}