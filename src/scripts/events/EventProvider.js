const eventHub = document.querySelector(".container");

let events = [];

const dispatchStateChangeEvent = () => {
  const eventsStateChanged = new CustomEvent("eventsStateChanged");
  eventHub.dispatchEvent(eventsStateChanged);
};

export const getEvents = () => {
  return fetch("http://localhost:8088/events")
    .then((response) => response.json())
    .then((eventsData) => {
      events = eventsData;
    });
};

export const saveEvent = (eventObj) => {
  return fetch("http://localhost:8088/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventObj),
  }).then(dispatchStateChangeEvent);
};

export const updateArticle = (eventObj) => {
  return fetch(`http://localhost:8088/events/${eventObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventObj),
  }).then(dispatchStateChangeEvent);
};

export const deleteEvents = (id) => {
  return fetch(`http://localhost:8088/events/${id}`, {
    method: "DELETE",
  }).then(dispatchStateChangeEvent);
};

export const useEvents = () => {
  return events.slice();
};
