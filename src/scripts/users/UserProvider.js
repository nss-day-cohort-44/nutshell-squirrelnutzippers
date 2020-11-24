const eventHub = document.querySelector(".container");

let users = [];

let activeUser;

export const getUsers = () => {
  return fetch(`http://localhost:8088/users`)
    .then((response) => response.json())
    .then((userData) => {
      users = userData;
    });
};

export const useUsers = () => {
  return users.slice();
};

// ACTIVE USER

export const getActiveUser = () => {
  const activeUserId = sessionStorage.getItem("activeUser");
  // FIND THE ACTIVE USER BY ID THEN FIND FRIENDS
  return fetch(`http://localhost:8088/users/${activeUserId}`)
    .then((response) => response.json())
    .then((userData) => {
      return getUserFriends(activeUserId).then((friends) => {
        if (friends !== undefined) {
          userData.friends = friends;
        } else {
          userData.friends = [];
        }
        setActiveUser(userData);
      });
    });
};

export const getUserFriends = (id) => {
  return fetch(`http://localhost:8088/friends/?activeUserId=${id}&_expand=user`)
    .then((response) => response.json())
    .then((userFriends) => {
      const friends = userFriends.map((friend) => friend.user);
      return friends;
    });
};

const setActiveUser = (user) => {
  activeUser = user;
  // CUSTOM EVENT TO NOTIFY UPDATE OF ACTIVE USER
  const activeUserUpdatedEvent = new CustomEvent("activeUserUpdated");
  eventHub.dispatchEvent(activeUserUpdatedEvent);
};

export const useActiveUser = () => {
  return activeUser;
};
