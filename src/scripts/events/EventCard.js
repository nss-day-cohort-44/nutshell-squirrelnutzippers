import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { deleteEvent } from "./EventProvider.js";
import "../weather/WeatherCardRow.js";

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
  const endDayRange = getXDaysFromToday(7);

  // CONVERT DATE FROM DB
  const date = new Date(eventObj.date.replace(/-/g, "/"));

  // CHECK DATE WITHIN 5 DAYS FOR WEATHER
  let dateInRange = false;
  if (today <= date && date <= endDayRange) {
    // console.log("DATE IN RANGE: ", date);
    dateInRange = true;
  }

  const daysFromToday = (date - today) / 86400000;

  const activeUser = useActiveUser();
  const eventCreator = useUsers().find((user) => user.id === eventObj.userId);

  const isFriend = activeUser.friends.find(
    (friend) => friend.id === eventCreator.id
  );

  const eventAsHTML = `
    <div class="event card ${isFriend ? "isFriend" : ""}">
        <div class="event--date">
        ${date.toLocaleDateString("en-US")}
        ${
          dateInRange
            ? `<button id="weather-event--${eventObj.id}--${daysFromToday}">show weather <i class="fas fa-cloud-sun"></i></button>`
            : ""
        }
        </div>
        ${
          dateInRange
            ? `<div id="event-weather__container--${eventObj.id}"></div>`
            : ""
        }
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

// EVENT LISTENERS
const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  // DELETE CLICK
  if (event.target.id.startsWith("delete-event--")) {
    const [prefix, eventId] = event.target.id.split("--");
    deleteEvent(parseInt(eventId));
  }
  // EDIT CLICK
  if (event.target.id.startsWith("edit-event--")) {
    const [prefix, eventId] = event.target.id.split("--");
    const eventEditEvent = new CustomEvent("eventEditClicked", {
      detail: {
        eventId: parseInt(eventId),
      },
    });
    eventHub.dispatchEvent(eventEditEvent);
  }
  // WEATHER CLICK
  if (event.target.id.startsWith("weather-event--")) {
    const [prefix, eventId, dayIndex] = event.target.id.split("--");
    const eventWeatherEvent = new CustomEvent("eventWeatherClicked", {
      detail: {
        eventId: parseInt(eventId),
        dayIndex: parseInt(dayIndex),
      },
    });
    eventHub.dispatchEvent(eventWeatherEvent);
  }
});
