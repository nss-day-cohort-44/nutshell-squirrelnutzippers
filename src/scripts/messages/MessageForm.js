import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { updateMessage, saveMessage, useMessages } from "./MessageProvider.js";

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
  ${
    messageId
      ? `<input id="message--edit" type="hidden" value="${messageToUpdate.id}" />`
      : ""
  }
    <input id="message--input" type="text" placeholder="type your message here..." ${
      messageToUpdate.text ? `value="${messageToUpdate.text}"` : ""
    }"/>
    </div>
    `;
};

// HANDLE NEW/EDITED MESSAGE ON ENTER KEY
eventHub.addEventListener("keydown", (event) => {
  // check if "Enter" was pressed while in message input
  if (event.target.id === "message--input" && event.key === "Enter") {
    // get message value
    const messageText = event.target.value;
    const newOrEditedMessage = {
      text: messageText,
    };
    // check if message text starts with "@"
    // if so, find username between @ and space
    // get userId > append to newMessage

    if (messageText.startsWith("@")) {
      const username = messageText.split(/[@ ]/)[1];

      const messagedUser = useUsers().find(
        (user) => user.username === username
      );
      if (messagedUser) {
        newOrEditedMessage.messageUserId = messagedUser.id;
      }
    }

    // check for hidden input, indicating edit
    const isEdit = document.querySelector("#message--edit");
    if (isEdit) {
      const messageId = isEdit.value;
      updateMessage(messageId, newOrEditedMessage);
      return;
    } else {
      const user = useActiveUser();
      // add message properties
      newOrEditedMessage.userId = user.id;
      newOrEditedMessage.timestamp = Date.now();

      // save message
      saveMessage(newOrEditedMessage);
    }
  }
});

eventHub.addEventListener("messageEditClicked", (event) => {
  console.log(event);
  const messageId = event.detail.messageId;
  MessageForm(messageId);
});
