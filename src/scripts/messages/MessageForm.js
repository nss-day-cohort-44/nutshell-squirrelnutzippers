import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { getMessages, saveMessage, useMessages } from "./MessageProvider.js";

const eventHub = document.querySelector(".container");

export const MessageForm = (messageId) => {
  const messageFormContainer = document.querySelector(
    "#message-form__container"
  );

  let messageToUpdate = {};

  if (messageId !== undefined) {
    console.log("messageId: ", messageId);
    messageToUpdate = useMessages().find((message) => message.id === messageId);
  }
  messageFormContainer.innerHTML = `
  <div class="form">
  ${messageId ? `<input type="hidden" value="${messageToUpdate.id}" />` : ""}
    <input id="message--input" type="text" placeholder="type your message here..." ${
      messageToUpdate.text ? `value="${messageToUpdate.text}"` : ""
    }"/>
    </div>
    `;
};

// HANDLE NEW MESSAGE ON ENTER KEY
eventHub.addEventListener("keydown", (event) => {
  if (event.target.id === "message--input" && event.key === "Enter") {
    const user = useActiveUser();
    // build new message object
    const newMessage = {
      userId: user.id,
      text: event.target.value,
      timestamp: Date.now(),
    };
    // check if message text starts with "@"
    // if so, find username between @ and space
    // get userId > append to newMessage

    if (newMessage.text.startsWith("@")) {
      const text = newMessage.text;
      const username = text.split(/[@ ]/)[1];

      console.log("username: ", username);
      const messagedUser = useUsers().find(
        (user) => user.username === username
      );
      console.log("messagedUser: ", messagedUser);
      if (messagedUser) {
        newMessage.messageUserId = messagedUser.id;
      }
    }

    // save message
    saveMessage(newMessage);
  }
});

eventHub.addEventListener("messageEditClicked", (event) => {
  console.log(event);
  const messageId = event.detail.messageId;
  MessageForm(messageId);
});
