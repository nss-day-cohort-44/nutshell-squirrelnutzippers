import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { deleteMessage } from "./MessageProvider.js";

const eventHub = document.querySelector(".container");

export const MessageCard = (messageObj) => {
  const sender = useUsers().find((user) => user.id === messageObj.userId);
  const activeUser = useActiveUser();
  const senderDisplay = sender.email.split("@")[0];

  const isActiveUserMessage = () => {
    return activeUser.id === sender.id;
  };
  return `
    <div class="message card ${isActiveUserMessage() ? "activeUser" : ""}">
        <div class="sender">${senderDisplay}</div>
        <div>${messageObj.text}</div>
        ${
          isActiveUserMessage()
            ? `<button id="message-delete--${messageObj.id}" class="button--delete">x</button>`
            : ""
        }
        
    </div>
    `;
};

eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("message-delete")) {
    const [prefix, messageId] = event.target.id.split("--");
    deleteMessage(parseInt(messageId));
  }
});
