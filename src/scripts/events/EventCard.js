import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { deleteEvent } from "./EventProvider.js";

export const EventCard = (eventObj) => {
  // GET TODAY'S DATE AND CLEAR THE TIME PORTION FOR COMPARING PURPOSES
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // FUNCTION TO GET X NUMBER OF DAYS FROM TODAY
  const getXDaysFromToday = (numOfDays) => {
    const startingDay = new Date();
    const xDays = startingDay.setDate(startingDay.getDate() + numOfDays);
    const endDate = new Date(xDays);
    endDate.setHours(0, 0, 0, 0);
    return endDate;
  };

  // STORE X-DAYS
  const endDayRange = getXDaysFromToday(5);

  // CONVERT DATE FROM DB
  const date = new Date(eventObj.date.replace(/-/g, "/"));

  // CHECK DATE WITHIN 5 DAYS FOR WEATHER
  let dateInRange = false;
  if (today <= date && date <= endDayRange) {
    // console.log("DATE IN RANGE: ", date);
    dateInRange = true;
  } else {
    console.log("TODAY", today);
    console.log("DATE", date);
  }
  const activeUser = useActiveUser();
  const eventCreator = useUsers().find((user) => user.id === eventObj.userId);

  const isFriend = activeUser.friends.find(
    (friend) => friend.id === eventCreator.id
  );

  if (isFriend) {
    console.log("isFriend: ", isFriend);
  }

  const eventAsHTML = `
    <div class="event card ${isFriend ? "isFriend" : ""}">
        <div class="event--date">
        ${date.toLocaleDateString("en-US")}
        ${
          dateInRange
            ? `<button>show weather <i class="fas fa-cloud-sun"></i></button>`
            : ""
        }
        </div>
        <div>${eventObj.name}</div>
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
