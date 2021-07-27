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
        let newCard = document.createElement('div')
        let og_title = data.original_title
        if (og_title === null) {
            og_title = ''
        }
        else {
            og_title = `(${data.original_title})`
        }

        newCard.className = 'infoCard'

        document.querySelector('#contain').appendChild(newCard)


        let NewCardInfo = `
            <span class = 'order'>${index + 1}</sapn>
            <h3 class = 'name'>${data.title} ${og_title}</h3>
            <p class = 'rate'>評分: ${data.rate}</p>
            <a href = 'https://www.imdb.com/title/${data.imdb_id}'> IMdb </a>
            `   

        newCard.innerHTML = NewCardInfo
    })
}