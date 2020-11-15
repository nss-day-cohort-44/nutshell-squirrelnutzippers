import { useActiveUser } from "../users/UserProvider.js";
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
    // save message
    saveMessage(newMessage);
  }
});
