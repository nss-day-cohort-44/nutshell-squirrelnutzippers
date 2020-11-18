import { useActiveUser } from "../users/UserProvider.js";
import { FriendCard } from "./FriendCard.js";
import { getFriends, useFriends } from "./FriendsProvider.js";

let userFriendships = [];

export const FriendList = () => {
  getFriends().then(() => {
    // get all friendships
    const allFriendships = useFriends();
    console.log("allFriendships: ", allFriendships);

    // get active user
    const activeUser = useActiveUser();
    // set user's friends to userFriends array
    userFriendships = allFriendships.filter(
      (friendship) => friendship.activeUserId === activeUser.id
    );

    console.log(userFriendships);
    render();
  });
};

const render = () => {
  const contentTarget = document.querySelector("#friends");
  const friendsAsHTML = userFriendships
    .map((friend) => FriendCard(friend))
    .join("");

  contentTarget.innerHTML =
    "<h1>Friends</h1>" +
    "<div class='friend--list'>" +
    friendsAsHTML +
    "</div>";
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("friendsStateChanged", FriendList);

// NEED TO BUILD A SEARCH COMPONENT TO ADD FRIEND
