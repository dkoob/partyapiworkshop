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
    const html = events.map((event) => {
        return `
        <div class="${color()} sidediv">
            <span><h2>${event.name}</h2></span>
            <span><p>${event.description}</p></span>
            <span class="date">${event.date}</span>
            <span class="splitter"></span>
            <span class="time">${event.location}</span>
            <!--<button id="deleteEvent" l>Not Interested</button>-->
        </div>
        <br>
        `
    })
    eventList.innerHTML = html.join("")
}

// buttons

loadEvent.addEventListener("click", () => location.reload());

// const index = events[0]
// removeEvent.addEventListener("click", () => {
//     event.preventDefault()
//     events.splice(index, 1)
//     console.log(events)
// })

// color function 

function color() {
    const random = Math.floor(Math.random() *2) +1;
    return "color" + random
}