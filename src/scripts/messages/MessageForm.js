import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { saveMessage } from "./MessageProvider.js";

const eventHub = document.querySelector(".container");

export const MessageForm = () => {
  return `
  <div class="form">
    <input id="message--input" type="text" placeholder="type your message here..."/>
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
        console.log("IN THE CONDITION!!!");
        newMessage.messageUserId = messagedUser.id;
      }
    }

    // save message
    saveMessage(newMessage);
  }
});
