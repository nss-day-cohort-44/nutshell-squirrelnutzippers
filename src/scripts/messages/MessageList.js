import { getMessages, useMessages } from "./MessageProvider.js";
import { getUsers } from "../users/UserProvider.js";
import { MessageCard } from "./MessageCard.js";

let messages = [];

export const MessageList = () => {
  getMessages()
    .then(getUsers)
    .then(() => {
      messages = useMessages();
      render();
    });
};

const render = () => {
  const contentTarget = document.querySelector("#messages");
  const messagesAsHTML = messages
    .map((message) => MessageCard(message))
    .join("");

  contentTarget.innerHTML += messagesAsHTML;
};
