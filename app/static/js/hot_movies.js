var dataurl = '/api/v1/trend/'
        var xhr = new XMLHttpRequest()
        xhr.open('GET', dataurl, true)
        xhr.send()
        xhr.onload = function(){
            var dataset = JSON.parse(this.responseText)
            console.log(dataset['movies'][0].title)
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
                <button type="button" class="btn btn-info" id="movie-add">+</button>
            </td>
        `   

        newCard.innerHTML = NewCardInfo
    })
}