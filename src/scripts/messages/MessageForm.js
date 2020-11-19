/*
  Author: Bryan Nilsen
  Responsibility: This module handles the rendering and processing of a message 
  form text input element.
  
  Parameters: messageId
  If a messageId is passed to the MessageForm component, it will act as an update
  to an existing message object. Otherwise, it will handle the creation of a new
  message object.
    
*/

import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { updateMessage, saveMessage, useMessages } from "./MessageProvider.js";

const eventHub = document.querySelector(".container");

export const MessageForm = (messageId) => {
  const messageFormContainer = document.querySelector(
    "#message-form__container"
  );

  let messageToUpdate = {};

  if (messageId !== undefined) {
    messageToUpdate = useMessages().find((message) => message.id === messageId);
  }
  messageFormContainer.innerHTML = `
  <div class="form">
  ${
    messageId
      ? `<input id="message--edit" type="hidden" value="${messageToUpdate.id}" /><i class="far fa-paper-plane"></i>`
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
      // add additional required message properties
      newOrEditedMessage.userId = user.id;
      newOrEditedMessage.timestamp = Date.now();

      // save message
      saveMessage(newOrEditedMessage);
    }
  }
});

// HANDLER FOR WHEN MESSAGE EDIT IS CLICKED
eventHub.addEventListener("messageEditClicked", (event) => {
  const messageId = event.detail.messageId;
  MessageForm(messageId);
});
