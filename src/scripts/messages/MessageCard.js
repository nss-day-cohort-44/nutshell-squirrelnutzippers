import { useActiveUser, useUsers } from "../users/UserProvider.js";

export const MessageCard = (messageObj) => {
  const sender = useUsers().find((user) => user.id === messageObj.userId);
  const activeUser = useActiveUser();
  const senderDisplay = sender.email.split("@")[0];

  return `
    <div class="message card ${activeUser.id === sender.id && "activeUser"}">
        <div class="sender">${senderDisplay}</div>
        <div>${messageObj.text}</div>
    </div>
    `;
};
