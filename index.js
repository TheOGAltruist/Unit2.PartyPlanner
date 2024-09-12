const COHORT = "2407-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

// We will start with a blank state
const initialState = {
    parties: []
}

// Select the section on the HTML for displaying the events
const partyList = document.querySelector(".partyList");

// Select the section on the HTML for submitting a new event and add a listener
const addEvent = document.querySelector(".partyForm");
addEvent.addEventListener("submit", addParty);

// function definition to render the current state
async function renderState() {
    await getParties();

    if (!initialState.parties.length) {
        return;
    } else {
        initialState.parties.forEach((party) => {
            const newListElement = document.createElement("li")
            newListElement.innerHTML = `
            <p>
                <strong>Party Name:</strong>${party.name}<br>
                <strong>Party Date:</strong> ${party.date}<br>
                <strong>Party Location:</strong> ${party.location}<br>
                <strong>Party Description:</strong> ${party.description}<br>
            </p>
            `

            partyList.append(newListElement)
        });
    }
}

renderState();

// Function definition to add new events
async function addParty(event) {
    event.preventDefault();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: addEvent.eventName.value,
                description: addEvent.eventDescription.value,
                date: new Date(addEvent.eventDate.value),
                location: addEvent.eventLocation.value
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create artist");
        }

        renderState();
    } catch (error) {
        console.error(error);
    }
}

// Function definition to call API and list of current events
async function getParties() {
    try {
        const response = await fetch(API_URL, {
            method: "GET"
        });

        if (!response.ok) {
            return
        } else {
            const jsonObject = await response.json();
            initialState.parties = jsonObject.data;
        }

    } catch (error) {
        console.error(error)
    }
}

// Function definition to render the artists