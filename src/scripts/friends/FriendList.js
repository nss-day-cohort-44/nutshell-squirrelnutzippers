import { useActiveUser } from "../users/UserProvider.js";
import { FriendCard } from "./FriendCard.js";
import { FriendSearch } from "./FriendSearch.js";
import { getFriends, useFriends } from "./FriendsProvider.js";

let userFriendships = [];

export const FriendList = () => {
  getFriends().then(() => {
    // get all friendships
    const allFriendships = useFriends();

    // get active user
    const activeUser = useActiveUser();
    // set user's friends to userFriends array
    userFriendships = allFriendships.filter(
      (friendship) => friendship.activeUserId === activeUser.id
    );

    render();
  });
};

const render = () => {
  const contentTarget = document.querySelector("#friends");
  const friendsAsHTML = userFriendships
    .map((friend) => FriendCard(friend))
    .join("");

  contentTarget.innerHTML = `
  <h1 class='section--header'>
    Friends
  <button id="friend--add">+ Add Friend</button>
  </h1>
  <div id="friendSearch__container"></div>
  <div class='friend--list'>
    ${friendsAsHTML}
  </div>`;
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("friendsStateChanged", FriendList);

eventHub.addEventListener("click", (event) => {
  if (event.target.id === "friend--add") {
    // CHECK IF CLOSE OR OPEN
    const button = document.getElementById("friend--add");
    if (event.target.innerHTML === "x Close") {
      button.innerHTML = "+ Add Friend";
      const closeSearchEvent = new CustomEvent("closeSearchClicked");
      eventHub.dispatchEvent(closeSearchEvent);
    } else {
      button.innerHTML = "x Close";
      const friendAddEvent = new CustomEvent("friendAddClicked");
      eventHub.dispatchEvent(friendAddEvent);
    }
  }
});
