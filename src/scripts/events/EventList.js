import { EventCard } from "./EventCard.js";
import { getEvents, useEvents } from "./EventProvider.js";
import { useActiveUser } from "../users/UserProvider.js";
import "./EventForm.js";

let eventsArray = [];

export const EventList = () => {
  getEvents().then(() => {
    const eventData = useEvents();
    const activeUser = useActiveUser();
    // group active user and friend ids
    const userAndFriendIds = activeUser.friends
      .map((cv) => cv.id)
      .concat(activeUser.id);

    // get all articles from active user and friends
    const filteredEvents = eventData.filter((event) =>
      userAndFriendIds.includes(event.userId)
    );
    eventsArray = filteredEvents;

    render();
  });
};

const render = () => {
  // location on DOM to Render ?? SHOULD THIS BE DECIDED BY COMPONENT or PARENT???
  const contentTarget = document.querySelector("#events");
  let eventsAsHTML = "";

  // CHECK IF USER HAS ANY EVENTS
  if (eventsArray.length === 0) {
    eventsAsHTML = "No events saved";
  } else {
    eventsAsHTML = eventsArray.map((event) => EventCard(event)).join("");
  }
  // RENDER EVENTSHTML TO DOM
  contentTarget.innerHTML = `
    <h1 class='section--header'>
        Events
        <button id="event--add-edit">+ New Event</button>
    </h1>
    <div id="eventForm__container"></div>
    <div class='event--list'>
        ${eventsAsHTML}
    </div>`;
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  if (event.target.id === "event--add-edit") {
    const eventAddEvent = new CustomEvent("eventAddClicked");
    eventHub.dispatchEvent(eventAddEvent);
  }
});

eventHub.addEventListener("eventsStateChanged", EventList);
eventHub.addEventListener("friendsStateChanged", EventList);
