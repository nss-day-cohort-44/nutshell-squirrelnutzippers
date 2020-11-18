import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { deleteEvent } from "./EventProvider.js";

export const EventCard = (eventObj) => {
  const date = new Date(eventObj.date).toDateString();
  const activeUser = useActiveUser();
  const eventCreator = useUsers().find((user) => user.id === eventObj.userId);

  const eventAsHTML = `
    <div class="event card">
        <div>${eventObj.name}</div>
        <div>${date} - <button>show weather</button></div>
        <div>${eventObj.location}</div>
  
        ${
          activeUser.id !== eventObj.userId
            ? `<div>created by: ${eventCreator.username}</div>`
            : ""
        } 
        ${
          activeUser.id === eventObj.userId
            ? `<div class="icons__container">
                <i id="delete-event--${eventObj.id}" class="far fa-trash-alt"></i>
                <i id="edit-event--${eventObj.id}" class="far fa-edit"></i>
              </div>`
            : ""
        }
    </div>
    `;

  return eventAsHTML;
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("delete-event--")) {
    const [prefix, eventId] = event.target.id.split("--");
    deleteEvent(parseInt(eventId));
  }
  if (event.target.id.startsWith("edit-event--")) {
    const [prefix, eventId] = event.target.id.split("--");
    const eventEditEvent = new CustomEvent("eventEditClicked", {
      detail: {
        eventId: parseInt(eventId),
      },
    });
    eventHub.dispatchEvent(eventEditEvent);
  }
});
