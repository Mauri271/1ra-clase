const detailsContainer = document.getElementById(`articleDetails`)

const params = new URLSearchParams(location.search);

const idParams = params.get(`id`)

const events = data.events.find((event => event._id == idParams))

document.title = `Details / ${events.name }`

console.log(events)

detailsContainer.innerHTML = `<div class="cardDetails mb-3 d-flex" style="max-width:1080px;">
<div class="row g-0  d-flex align-items-center">
  <div class="col-md-4">
    <img src="${events.image}" class="img-fluid rounded-start p-3" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body p-3">
      <h5 class="card-title">${events.name}</h5>
      <p class="card-textD">${events.description}</p>
      <p class="card-textD">Price : $${events.price}</p>
      <p class="card-textD">Date: ${events.date}</p>
      <p class="card-textD">Category:${events.category}</p>
      <p class="card-textD">Place: ${events.place}</p>
      <p class="card-textD">Capacity:${events.capacity}</p>
      <p class="card-textD">Assistance ${events.assistance}</p>      
      <p class="card-textD">Estimate ${(events.estimate)}</p>
      <a href="/index.html" class="btn btn-primary bg-dark">Go back Home</a>
    </div>
  </div>
</div>
</div>`

