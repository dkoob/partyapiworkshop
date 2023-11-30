// variables

const eventList = document.querySelector(".eventList")
const loadEvent = document.querySelector("#loadEvent")
let events = []

// api access

async function fetchEvents() {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310/events")
    const data = await response.json()
    events = data.data
    renderEvents()
}

async function fetchGuests() {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310/guests")
    const data = await response.json()
    guests = data.data
    console.log(guests)
}

async function fetchRsvps() {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310/rsvps")
    const data = await response.json()
    rsvps = data.data
    console.log(rsvps)
}

fetchEvents()
fetchGuests() // gave up on these for now
fetchRsvps()

// render functions

function renderEvents() {
    if (events.length > 0){
        const html = events.map((event, index) => {
            return `
            <div class="${color()} sidediv">
                <span><h2>${event.name}</h2></span>
                <span><p>${event.description}</p></span>
                <span class="date">${event.date}</span>
                <span class="splitter"></span>
                <span class="time">${event.location}</span>
                <button id="deleteEvent" data-index="${index}">Not Interested</button> <!-- data-index assigns a dataset called "index" with the property of the current array index to each button as it maps through -->
                <div class="${event.id}"> <!-- setup for my second render function to pop into -->
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
                renderEvents(); // re-render the page
            }) // this took me much longer than i would like to admit to find and understand
        }) 
    }else{
        eventList.innerHTML = `<div class="${color()} sidediv"><span><h2>You are not currently subscribed to any events! Click reload events at the top left to view our current events.</h2></span></div>`
    }
}

// buttons

loadEvent.addEventListener("click", () => location.reload());

// color function 

function color() {
    const random = Math.floor(Math.random() *2) +1;
    return "color" + random
}