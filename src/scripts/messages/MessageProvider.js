const eventHub = document.querySelector(".container");

let messages = [];

const dispatchStateChangeEvent = () => {
  const messageStateChanged = new CustomEvent("messageStateChanged");
  eventHub.dispatchEvent(messageStateChanged);
  window.localStorage.setItem("chatUpdated", true);
};

export const getMessages = () => {
  return fetch("http://localhost:8088/messages")
    .then((response) => response.json())
    .then((messageData) => {
      messages = messageData;
    });
};

export const saveMessage = (messageObj) => {
  return fetch("http://localhost:8088/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageObj),
  }).then(dispatchStateChangeEvent);
};
export const updateMessage = (id, messageObj) => {
  return fetch(`http://localhost:8088/messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageObj),
  }).then(dispatchStateChangeEvent);
};

export const deleteMessage = (id) => {
  return fetch(`http://localhost:8088/messages/${id}`, {
    method: "DELETE",
  }).then(dispatchStateChangeEvent);
};

export const useMessages = () => {
  return messages.slice();
};
