var dataurl = '/api/v1/top250/'
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
                <td class = 'movie_rate'>
                ${rate}
                </td>    
            `
        }

        else {
            rate_html = `
                <td class = 'movie_rate'>
                <img src="/static/image/star.png" width="7%">
                ${rate}
                </td> 
            `

        }


        newCard.className = 'infoCard'

        document.querySelector('#movies_contain').appendChild(newCard)


        let NewCardInfo = `
            <td class = 'movie_image'>
                <img src = '${data.image}' width=20%>
            </td>

            <td class = 'movie_title'>${data.title} ${og_title}</td>
  
            <td class = 'movie_type'>${data.genre}</td>


            ${rate_html}


            <td class = 'imdb_link'>
                <a href = 'https://www.imdb.com/title/${data.imdb_id}' target='_blank'> IMdb </a>
            </td>

            `   

        newCard.innerHTML = NewCardInfo
    })
}