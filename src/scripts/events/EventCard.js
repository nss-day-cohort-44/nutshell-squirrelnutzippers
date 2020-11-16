import { useActiveUser } from "../users/UserProvider.js";

export const EventCard = (eventObj) => {
  const date = new Date(eventObj.date).toDateString();
  const activeUser = useActiveUser();

  const eventAsHTML = `
    <div class="event card">
        <div>${eventObj.name}</div>
        <div>${date} - <button>show weather</button></div>
        <div>${eventObj.location}</div>
        ${
          activeUser.id === eventObj.userId
            ? `<button id="delete-event--${eventObj.id}" class="delete">DELETE</button>
              <button id="edit-event--${eventObj.id}">EDIT</button>
              `
            : ""
        }
    </div>
    `;

  return eventAsHTML;
};

// event listeners for delete/edit/weather
