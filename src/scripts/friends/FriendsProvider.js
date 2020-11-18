import { getActiveUser } from "../users/UserProvider.js";

const eventHub = document.querySelector(".container");

let friends = [];

const dispatchStateChangeEvent = () => {
  const friendsStateChanged = new CustomEvent("friendsStateChanged");
  eventHub.dispatchEvent(friendsStateChanged);
};

export const useFriends = () => {
  return friends.slice();
};

export const getFriends = () => {
  return fetch("http://localhost:8088/friends?_expand=user")
    .then((response) => response.json())
    .then((friendsData) => {
      friends = friendsData;
    });
};

export const saveFriend = (friendObj) => {
  return fetch("http://localhost:8088/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(friendObj),
  })
    .then(getFriends)
    .then(getActiveUser)
    .then(dispatchStateChangeEvent);
};

export const deleteFriend = (friendshipId) => {
  return fetch(`http://localhost:8088/friends/${friendshipId}`, {
    method: "DELETE",
  })
    .then(getFriends)
    .then(getActiveUser)
    .then(dispatchStateChangeEvent);
};
