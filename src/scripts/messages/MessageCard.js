import { saveFriend } from "../friends/FriendsProvider.js";
import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { deleteMessage } from "./MessageProvider.js";

const eventHub = document.querySelector(".container");

export const MessageCard = (messageObj) => {
  // get current user
  const activeUser = useActiveUser();
  // get message sender
  const sender = useUsers().find((user) => user.id === messageObj.userId);
  const senderDisplay = sender.username;

  // is this message from the current user?
  const isActiveUserMessage = () => {
    return activeUser.id === sender.id;
  };

  // is this message from a friend of the user?
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

  // is this a private message? - if so, is it private to or from the current user?
  // TODO: NEED LOGIC IN HERE TO PREVENT SOMEONE FROM DM'ing a non-friend
  const isPrivateMessage = () => {
    let isPrivate = false;
    if (messageObj.hasOwnProperty("messageUserId")) {
      if (
        messageObj.messageUserId === activeUser.id ||
        messageObj.userId === activeUser.id
      ) {
        isPrivate = false;
        messageClass = "private";
        // console.log(messageObj.text.split(/[@ ]/).slice(2).join(" "));
      } else {
        isPrivate = true;
      }
    }
    return isPrivate;
  };

  if (isPrivateMessage()) {
    return;
  } else if (isActiveUserMessage()) {
    return `
    <div class="message--card__container">
      <div class="message--card activeUser ${messageClass}">
        <div>${messageObj.text}</div>
        </div>
      <div class="icons__container">
        <i id="message-delete--${messageObj.id}" class="far fa-trash-alt"></i>
        <i id="message-edit--${messageObj.id}" class="far fa-edit"></i>
      </div>
    </div>
    `;
  } else if (isFriendMessage()) {
    return `
    <div class="message--card__container">
      <div class="message--sender">${senderDisplay}</div>
      <div class="message--card otherUser ${messageClass}">
      <div>${messageObj.text}</div>
      </div>
    </div>
    `;
  } else {
    return `
    <div class="message--card__container">
      <div id="message-userId--${messageObj.userId}" class="message--sender">${senderDisplay}</div>
      <div class="message--card otherUser">
      <div>${messageObj.text}</div>
      </div>
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
