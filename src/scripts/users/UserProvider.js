let users = [];

let activeUser;

export const getUsers = () => {
  return fetch(`http://localhost:8088/users`)
    .then((response) => response.json())
    .then((userData) => {
      console.log("userData", userData);
      users = userData;
    });
};

export const useUsers = () => {
  return users.slice();
};

// ACTIVE USER

export const getActiveuser = (id) => {
  // FIND THE ACTIVE USER BY ID THEN FIND FRIENDS
  return fetch(`http://localhost:8088/users/${id}`)
    .then((response) => response.json())
    .then((userData) => {
      return getUserFriends(id).then((friends) => {
        userData.friends = friends;
        setActiveUser(userData);
      });
    });
};

const setActiveUser = (user) => {
  activeUser = user;
  console.log("activeUser", activeUser);
  // CUSTOM EVENT NEEDED HERE TO NOTIFY UPDATE OF ACTIVE USER
};

export const getUserFriends = (userId) => {
  return fetch(
    `http://localhost:8088/friends/?activeUserId=${userId}&_expand=user`
  )
    .then((response) => response.json())
    .then((userFriends) => {
      const friends = userFriends.map((friend) => friend.user);
      return friends;
    });
};

export const useActiveUser = () => {
  return activeUser;
};
