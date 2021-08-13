// 渲染 html 函式庫

// 渲染 trend 、 top 電影頁面
export function print_movies(dataset)
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