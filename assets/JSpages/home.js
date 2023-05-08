let article = document.getElementById("cardsArticle")

function cardCreator (card){
return `<div class="card">
<img src=${card.image} class="card-img-top" alt="foodFair">
<div class="card-body d-flex flex-column align-center">
  <h5 class="card-title">${card.name}</h5>
  <p class="card-text">${card.description}</p>
  <p>Price: $${card.price}</p>
  <p>Place: ${card.place}</p>
  <a href="#" class="btn btn-primary bg-dark">See more</a>
</div>
</div>`
}

function cardPrinter(data, where) {
    let template = ""
    for(let element of data){
        template += cardCreator(element)
    }

    where.innerHTML += template
}

cardPrinter(data.events, article)







{/* <div class="card">
<img src="./assets/img/Feria de comidas7.jpg" class="card-img-top" alt="foodFair">
<div class="card-body d-flex flex-column align-center">
  <h5 class="card-title">Collectivitie`s Festival</h5>
  <p class="card-text">Enjoy your favorite dishes from different countries in a unique event for the whole
    family.</p>
  <p>Price $5</p>
  <a href="#" class="btn btn-primary bg-dark">See more</a>
</div>
</div> */}