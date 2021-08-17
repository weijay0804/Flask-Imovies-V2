import { get_datas_no_auth } from "../module/requests.js"

var xhr = get_datas_no_auth('/api/v1/movies?random=9')

xhr.onload = function(){
    var dataset = JSON.parse(this.responseText)
    
    print(dataset)
}

function print(dataset)
{
    dataset['movies'].forEach( (data, index) => {


        var items_html = document.querySelector(`#card-${index+1}`)
        
        var card_html = `
            <img src="${data.image}" class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.genre}</p>
                <a href="/movies/${data.mid}" class="btn btn-primary">簡介</a>
            </div>
        `

        items_html.innerHTML = card_html
    })
}