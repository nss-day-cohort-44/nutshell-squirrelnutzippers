import { useActiveUser } from "../users/UserProvider.js";
import { saveEvent, useEvents, updateEvent } from "./EventProvider.js";

const eventHub = document.querySelector(".container");

export const EventForm = (eventId) => {
  // logic to determine if this is add new or edit
  const isEdit = () => eventId !== undefined;

  let eventToEdit;

  if (isEdit()) {
    eventToEdit = useEvents().find((event) => event.id === eventId);

    return `
    <div class="form">
    <input type="hidden" id="event--id" value="${eventToEdit.id}">
      <input id="event--name" type="text" placeholder="name" value="${eventToEdit.name}"/>
      <input id="event--date" type="date" placeholder="date" value="${eventToEdit.date}"/>
      <input id="event--location" type="text" placeholder="location" value="${eventToEdit.location}"/>
      <button id="eventForm--submit">submit</button>
    </div>
      `;
  }

  return `
    <div class="form">
      <input id="event--name" type="text" placeholder="name"/>
      <input id="event--date" type="date" placeholder="date"/>
      <input id="event--location" type="text" placeholder="location"/>
      <button id="eventForm--submit">submit</button>
    </div>
      `;
};

eventHub.addEventListener("eventAddClicked", (event) => {
  const contentTarget = document.querySelector("#eventForm__container");
  contentTarget.innerHTML = EventForm();
});

eventHub.addEventListener("eventEditClicked", (event) => {
  const eventId = event.detail.eventId;
  const contentTarget = document.querySelector("#eventForm__container");
  contentTarget.innerHTML = EventForm(eventId);
});

eventHub.addEventListener("click", (event) => {
  // Check event submit button was clicked
  if (event.target.id === "eventForm--submit") {
    // get form input values
    const nameInput = document.querySelector("#event--name").value;
    const dateInput = document.querySelector("#event--date").value;
    const locationInput = document.querySelector("#event--location").value;
    const hiddenId = document.querySelector("#event--id");

    if (nameInput === "" || dateInput === "" || locationInput === "") {
      alert("Please Fill out all Fields in the Event Form");
    } else {
      const user = useActiveUser();

      // CHECK IF EDITING OR CREATING NEW
      if (hiddenId) {
        const editedEvent = {
          id: parseInt(hiddenId.value),
          name: nameInput,
          date: dateInput,
          location: locationInput,
          userId: user.id,
        };
        updateEvent(editedEvent);
      } else {
        const newEvent = {
          name: nameInput,
          date: dateInput,
          location: locationInput,
          userId: user.id,
        };
        saveEvent(newEvent);
      }
    }
  }
});
