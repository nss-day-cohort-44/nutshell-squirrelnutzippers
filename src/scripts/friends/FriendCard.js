import { deleteFriend } from "./FriendsProvider.js";

export const FriendCard = (friendshipObj) => {
  return `
    <div class="friend--card">
        <div>${friendshipObj.user.username}</div>
        <div class="icons__container">
        <i id="delete-friend--${friendshipObj.id}" class="fas fa-minus-circle"></i>
    </div>
    </div>
    `;
};
// need event listener here to handle delete
const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("delete-friend--")) {
    const [prefix, friendId] = event.target.id.split("--");
    deleteFriend(parseInt(friendId));
  }
});
