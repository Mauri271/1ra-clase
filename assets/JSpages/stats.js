let highestAttendanceEvent = document.getElementById(`highestAttendance`);
let lowestAttendaceEvent = document.getElementById(`lowestAttendace`);
let highestCapacityEvent = document.getElementById(`highestCapacity`);
let tableUpcoming = document.getElementById(`tableUpcoming`)
let tablePast = document.getElementById(`tablePast`)



let dataFromJson;

fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
  .then((data) => data.json())
  .then((response) => {

    //guardar response en la variable dataFromJson
    dataFromJson = response;


    //new array with calculated percentages
    let arrayEvents = Array.from(dataFromJson.events);
    
    let nameAndAssistance = arrayEvents
      .filter((event) => event.assistance)
      .map((event) => ({
        name: event.name,
        assistance: (event.assistance / event.capacity) * 100
      }));



    //reduce highest assitance event--------------------
    const higherAssitanceEvent = nameAndAssistance.reduce(
      (actualEvent, nextEvent) => {
        return actualEvent.assistance > nextEvent.assistance ? actualEvent : nextEvent;
      });
    highestAttendanceEvent.textContent = `${higherAssitanceEvent.name} % ${higherAssitanceEvent.assistance}`;



    //reduce lowest assitance event-------------------
    const lowestAssitanceEvent = nameAndAssistance.reduce(
      (actualEvent, nextEvent) => {
        return actualEvent.assistance < nextEvent.assistance ? actualEvent : nextEvent;
      });
    lowestAttendaceEvent.textContent = `${lowestAssitanceEvent.name} % ${lowestAssitanceEvent.assistance}`;


    //reduced capacity ------------------------------------------------
    
     const higherCapacityEvent = arrayEvents.reduce((actualEvent, nextEvent) =>{
        return actualEvent.capacity > nextEvent.capacity ? actualEvent : nextEvent
      });
      highestCapacityEvent.textContent = `${higherCapacityEvent.name} ${higherCapacityEvent.capacity}`

      //==TABLA DE UPCOMING==

const upcomingEvents = dataFromJson.events.filter (event => event.date >= dataFromJson.currentDate)
const upcomingCategory = Array.from ( new Set ( upcomingEvents.map (( event) => event.category)))
console.log(upcomingCategory)

//Itera el array de eventos que llega por parametro y por cada elemento a la variable totalRevenue le suma el precio del evento x la asistencia o la asistencia estimada, segun sea evento pasado o futuro
function calcRevenues(events) {
  let totalRevenue = 0;
  events.forEach((event) => {
    totalRevenue += event.price * (event.estimate || event.assistance);
  });
  return totalRevenue;
}

//Itera el array de eventos que llega por parametro y por cada elemento le suma a la variable totalAssistance la asistencia del evento dividido la capacidad, multiplicado por 100
function calcAssistance(events) {
  let totalAssistance = 0;
  events.forEach((event) => {
    totalAssistance += ((event.assistance || event.estimate) / event.capacity) * 100;
  });
  return totalAssistance;
}


function upcomingEventsData(categorias, events) {

    let result = [];

    categorias.map((category) => {
      let categoryEvents = events.filter((event) => category == event.category);
      console.log(categoryEvents) 
      let revenues = calcRevenues(categoryEvents);
      let assistance  = calcAssistance(categoryEvents);

      result.push({
        category, revenues, assistance: assistance / categoryEvents.length,
      });
    });
    return result;
    
  }

  
  const infoTableUpcomingEventsConst = upcomingEventsData (upcomingCategory, upcomingEvents); 

  let tableTwo = document.createElement('table');
  let tBody= document.createElement('tbody');
  tableTwo.className = "table";
  tableTwo.innerHTML = `
    <tr>
      <th colspan ="2" >Categories</th>
      <th colspan ="2" >Revenues</th>
      <th colspan ="2" >Percentage of attendance</th>
    </tr>
  </thead>`;
  
  infoTableUpcomingEventsConst.forEach((events) => {
    let crearTr = document.createElement('tr');
    crearTr.innerHTML = `<td colspan ="2" >${events.category}</td>
    <td colspan ="2" > $ ${events.revenues.toLocaleString()}</td>
    <td colspan ="2" >${events.assistance.toFixed(2)} %</td>`;
    tBody.appendChild(crearTr);
  });
  
  tableTwo.appendChild(tBody);

  tableUpcoming.append (tableTwo)

//==TABLA DE PAST==
const pastEvents = dataFromJson.events.filter (event => event.date <= dataFromJson.currentDate)
const pastCategory = Array.from ( new Set ( pastEvents.map (( event) => event.category)))

function infoTablePastEvents(categorias, events) {

    let result = [];

    categorias.map((category) => {
      let categoriaEvents = events.filter((event) => category == event.category);
      let revenues = calculateRevenues(categoriaEvents);
      let assistance = calculateAssistance(categoriaEvents);
      result.push({
        category,revenues,assistance: assistance / categoriaEvents.length,
      });
    });
  
    return result;
  }
  
  function calculateRevenues(events) {
    let totalRevenue = 0;
    events.forEach((event) => {
      totalRevenue += event.price * (event.estimate || event.assistance);
    });
    return totalRevenue;
  }

  function calculateAssistance(events) {
    let totalAssistance = 0;
    events.forEach((event) => {
      totalAssistance += ((event.assistance || event.estimate) / event.capacity) * 100;
    });
    return totalAssistance;
  }
  
  
  const infoTablePastEventsConst = infoTablePastEvents (pastCategory, pastEvents); 

  
  let tableThree = document.createElement('table');
  let tBodyThree = document.createElement('tbody');
  tableThree.className = "table";
  tableThree.innerHTML = `<tr>
  <th colspan="6" >Past events statistics by category</th>
</tr>
    <tr>
      <th colspan ="2" >Categories</th>
      <th colspan ="2" >Revenues</th>
      <th colspan ="2" >Percentage of attendance</th>
    </tr>
  </thead>`;
  infoTablePastEventsConst.forEach((eventos) => {
    let crearTr = document.createElement('tr');
    crearTr.innerHTML = `<td colspan ="2" >${eventos.category}</td>
    <td colspan ="2" > $ ${eventos.revenues.toLocaleString()}</td>
    <td colspan ="2" >${eventos.assistance.toFixed(2)} %</td>`;
    tBodyThree.appendChild(crearTr);
  });
  
  tableThree.appendChild(tBodyThree);
  

   //Imprimir tablas
   tablePast.append (tableThree)


      // reduced categories, revenues and percentage--------------------

//       const categories = Array.from(new Set(arrayEvents.map(event => event.category)))

//       //print categories
//       createTd(categories, tableBody)


//       //---------------- nuevo objeto a partir del array original
//       const newArray = Array.from(new Set(arrayEvents.filter((event) => event.assistance)
//         .map(event => ({
//         category : event.category,
//         price: event.price,
//         assistance: event.assistance,
//         capacity: event.capacity,
//         estimate: event.estimate
//       }))))



//   //------------calcular revenues
//       let revenues = {};

//       newArray.forEach(events => {
//         const {category, price, assistance} = events
//         const categoryRevenue = price * assistance;

//         if (!revenues[category]){
//             revenues[category] = categoryRevenue
//         } else {
//             revenues[category] += categoryRevenue
//         }
//     })


//     //---------crear un nuevo objeto iterable a partir de revenues
//     let nuevoObjeto = Object.entries(revenues).map(([category, revenue]) => ({
//         category: category,
//         revenue: revenue
//       }));
      

// //------------guardar los revenues en un nuevo objeto para poder pasarlo como argumento
//       const mapedRevenue = nuevoObjeto.map(event=>`$${ event.revenue}`)


// //---------------imprimir revenues en la tabla      
//    createTd(mapedRevenue, pastRevenues)




//   //forEach percentage-------------------

  
//   let percentages ={}

//             newArray.forEach(events => {
//     const {category, capacity, assistance} = events
//     const categoryPercentage = ((assistance / capacity) * 100)
//     if (!percentages[category]){
//         percentages[category] = {
//             category: category,
//             percentage: categoryPercentage,
//             count : 1,
//         }
//     } else {
//         percentages[category].percentage += categoryPercentage
//         percentages[category].count ++
//         percentages[category].percentage = percentages[category].percentage / percentages[category].count
//     }
      

// })

// let newPercentages = Array.from(Object.entries(percentages).map(event => event[1].percentage))

// console.log(newPercentages)
// createTd(newPercentages, pastPercentege )


// console.log(newArray)

  })
  .catch((err) => console.log(err));

//   function createTd (elements, where) {
//     let template = `<tr class="d-flex flex-column"> </tr>`
//     for (let element of elements){
//         template += ` 
//         <td colspan="2">${element}</td>`
      
//     }
//     where.innerHTML = template
//   }
  

 


