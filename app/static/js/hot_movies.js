var dataurl = '/api/v1/hot_movies'
        var xhr = new XMLHttpRequest()
        xhr.open('GET', dataurl, true)
        xhr.send()
        xhr.onload = function(){
            var dataset = JSON.parse(this.responseText)
            console.log(dataset['hot_movies'][0].title)
            print(dataset)
        }

function print(dataset) {
    dataset['hot_movies'].forEach( (data, index) => {
        let newCard = document.createElement('tr')
        let og_title = data.original_title
        if (og_title === null) {
            og_title = ''
        }
        else {
            og_title = `(${data.original_title})`
        }

        newCard.className = 'infoCard'

        document.querySelector('#movies_contain').appendChild(newCard)


        let NewCardInfo = `
            <td class = 'movie_image'>
                <img src = '${data.image}' width=20%>
            </td>

            <td class = 'movie_title'>${data.title} ${og_title}</td>
  
            <td class = 'movie_type'>${data.genre}</td>


            <td class = 'movie_rate'>${data.rate}</td>


            <td class = 'imdb_link'>
                <a href = 'https://www.imdb.com/title/${data.imdb_id}'> IMdb </a>
            </td>

            `   

        newCard.innerHTML = NewCardInfo
    })
}