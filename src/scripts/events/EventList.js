import { EventCard } from "./EventCard.js";
import { getEvents, useEvents } from "./EventProvider.js";

let eventsArray = [];

export const EventList = () => {
  getEvents().then(() => {
    const allEvents = useEvents();
    eventsArray = allEvents;
    render();
  });
};

const render = () => {
  // location on DOM to Render ?? SHOULD THIS BE DECIDED BY COMPONENT or PARENT???
  const contentTarget = document.querySelector("#events");
  const eventsAsHTML = eventsArray.map((event) => EventCard(event)).join("");
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
