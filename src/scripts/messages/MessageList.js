import { getMessages, useMessages } from "./MessageProvider.js";
import { getUsers } from "../users/UserProvider.js";
import { MessageCard } from "./MessageCard.js";
import { MessageForm } from "./MessageForm.js";

const eventHub = document.querySelector(".container");

let messages = [];

export const MessageList = () => {
  getMessages()
    .then(getUsers)
    .then(() => {
      messages = useMessages();
      render();
      window.localStorage.setItem("chatUpdated", false);
    });
};

const render = () => {
  const contentTarget = document.querySelector("#messages");
  const messagesAsHTML = messages
    .map((message) => MessageCard(message))
    .join("");

  contentTarget.innerHTML =
    "<h1>Chat</h1>" +
    "<div class='message--list'>" +
    messagesAsHTML +
    "</div>" +
    MessageForm();
};

// Reload messages after message add, delete, update
eventHub.addEventListener("messageStateChanged", MessageList);

// Reload messages if messages changed in another tab
window.addEventListener("storage", () => {
  if (window.localStorage.getItem("chatUpdated")) {
    MessageList();
  }
});
