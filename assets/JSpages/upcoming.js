let article = document.getElementById("cardsArticle")

console.log(article)

function cardCreator (card){
    return `<div class="card">
    <img src=${card.image} class="card-img-top" alt="foodFair">
    <div class="card-body d-flex flex-column align-center">
      <h5 class="card-title">${card.name}</h5>
      <p class="card-text">${card.description}</p>
      <p>Price: $${card.price}</p>
      <p>Place: ${card.place}</p>
      <a href="../pages/details.html" class="btn btn-primary bg-dark">See more</a>
    </div>
    </div>`
    }

    function cardPrinter(list, where) {
        let template = ""
        for(let element of list){
            if(element.date > data.currentDate){
                template += cardCreator(element)
            }
        }
        where.innerHTML += template
    }

    cardPrinter(data.events, article)