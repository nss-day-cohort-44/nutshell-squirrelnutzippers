import { getMessages, useMessages } from "./MessageProvider.js";
import { getUsers } from "../users/UserProvider.js";
import { MessageCard } from "./MessageCard.js";
import { MessageForm } from "./MessageForm.js";

const eventHub = document.querySelector(".container");

let messages = [];

export const MessageList = () => {
  getMessages().then(() => {
    messages = useMessages();
    render();
    window.localStorage.setItem("chatUpdated", false);
  });
};

const render = () => {
  const contentTarget = document.querySelector("#messages");
  const messagesAsHTML = messages
    .map((message) => MessageCard(message))
    .reverse()
    .join("");

  contentTarget.innerHTML = `<h1 class='section--header'>Chat</h1>
    <div class='message--list'>
    ${messagesAsHTML}
    </div>
    <div id="message-form__container">
    </div>`;

  MessageForm();
};

// Reload messages after message add, delete, update
eventHub.addEventListener("messageStateChanged", MessageList);
eventHub.addEventListener("friendsStateChanged", MessageList);

// Reload messages if messages changed in another tab
window.addEventListener("storage", () => {
  if (window.localStorage.getItem("chatUpdated")) {
    MessageList();
  }
});
