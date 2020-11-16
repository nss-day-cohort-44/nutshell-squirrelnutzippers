import { saveFriend } from "../friends/FriendsProvider.js";
import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { deleteMessage } from "./MessageProvider.js";

const eventHub = document.querySelector(".container");

export const MessageCard = (messageObj) => {
  const activeUser = useActiveUser();
  const sender = useUsers().find((user) => user.id === messageObj.userId);
  const senderDisplay = sender.email.split("@")[0];

  const isActiveUserMessage = () => {
    return activeUser.id === sender.id;
  };

  const isFriendMessage = () => {
    let isFriend = false;
    if (activeUser.friends.length > 0) {
      isFriend = activeUser.friends.find(
        (friend) => friend.id === messageObj.userId
      );
    }
    return isFriend;
  };

  let messageClass = "";

  const isPrivateMessage = () => {
    let isPrivate = false;
    if (messageObj.hasOwnProperty("messageUserId")) {
      if (
        messageObj.messageUserId === activeUser.id ||
        messageObj.userId === activeUser.id
      ) {
        isPrivate = false;
        messageClass = "private";
      } else {
        isPrivate = true;
      }
    }
    return isPrivate;
  };

  console.log("isPrivateMessage: ", isPrivateMessage());
  if (isPrivateMessage()) {
    return;
  } else if (isActiveUserMessage()) {
    return `
    <div class="message card activeUser ${messageClass}">
    <div class="sender">${senderDisplay}</div>
    <div>${messageObj.text}</div>
    <button id="message-delete--${messageObj.id}" class="button--delete">x</button>
    </div>
    `;
  } else if (isFriendMessage()) {
    return `
    <div class="message card ${messageClass}">
    <div class="sender">${senderDisplay}</div>
    <div>${messageObj.text}</div>
    </div>
    `;
  } else {
    return `
    <div class="message card ${messageClass}">
    <button id="message-userId--${messageObj.userId}" class="sender">${senderDisplay}</button>
    <div>${messageObj.text}</div>
    </div>
    `;
  }
};

eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("message-delete")) {
    const [prefix, messageId] = event.target.id.split("--");
    deleteMessage(parseInt(messageId));
  }
  if (event.target.id.startsWith("message-userId")) {
    const [prefix, userId] = event.target.id.split("--");
    const confirmFriend = confirm(
      `Are you sure you want to add ${event.target.value} to your friends list?`
    );
    if (confirmFriend) {
      const activeUser = useActiveUser();
      const newFriend = {
        activeUserId: activeUser.id,
        userId: parseInt(userId),
      };
      saveFriend(newFriend);
    }
  }
});
