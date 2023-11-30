// variables

const eventList = document.querySelector(".eventList")
const loadEvent = document.querySelector("#loadEvent")
// const removeEvent = document.querySelector("#deleteEvent")
let events = []

// api access

async function fetchEvents() {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310/events")
    const data = await response.json()
    events = data.data
    render()
}

fetchEvents()

// render function

function render() {
    const html = events.map((event, index) => {
        return `
        <div class="${color()} sidediv">
            <span><h2>${event.name}</h2></span>
            <span><p>${event.description}</p></span>
            <span class="date">${event.date}</span>
            <span class="splitter"></span>
            <span class="time">${event.location}</span>
            <button id="deleteEvent" data-index="${index}">Not Interested</button> <!-- data-index assigns a dataset called "index" with the property of the current array index to each button as it maps through -->
            <div>
                <br>
                test
            </div>
        </div>
        <br>
        `
    })
    eventList.innerHTML = html.join("")
    document.querySelectorAll('#deleteEvent').forEach((button) => { // here we take every single button with the id of deleteEvent and go throguh each adding an event listener
        button.addEventListener('click', (event) => { // the event listener acts on click and carries out the specified event
            const index = event.target.dataset.index; // this takes our dataset from the html preview above, so we can single out the button that is clicked
            events.splice(index, 1); // simple splice to remove from array
            render(); // re-render the page
        }) // this took me much longer than i would like to admit to find and understand
    }) 
}

// buttons

loadEvent.addEventListener("click", () => location.reload());

// color function 

function color() {
    const random = Math.floor(Math.random() *2) +1;
    return "color" + random
}