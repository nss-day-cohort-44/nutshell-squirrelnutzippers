import { useActiveUser, useUsers } from "../users/UserProvider.js";
import { saveFriend } from "./FriendsProvider.js";

const renderResults = (keyword) => {
  // Location to display results
  const resultsContainer = document.querySelector("#search--results");
  console.log("searched: ", keyword);

  if (keyword === "") {
    resultsContainer.innerHTML = "";
    return;
  }

  const allUsers = useUsers();
  const activeUser = useActiveUser();
  // group active user and friend ids
  const userAndFriendIds = activeUser.friends
    .map((cv) => cv.id)
    .concat(activeUser.id);

  const filteredUsers = allUsers.filter(
    (user) => !userAndFriendIds.includes(user.id)
  );
  console.log("filteredUsers: ", filteredUsers);

  const searchFilter = filteredUsers.filter((user) =>
    user.username.toLowerCase().includes(keyword)
  );

  const resultsHTML = searchFilter
    .map(
      (user) =>
        `<div class="search--result" id="search-userId--${user.id}">${user.username}</div>`
    )
    .join("");

  resultsContainer.innerHTML = `
  <div class="search--results__container">
  ${resultsHTML}
  </div>
  `;
};

export const FriendSearch = () => {
  return `
  <input id="friend--search" placeholder="find a friend">
  <div id="search--results"></div>
  `;
};

// RENDER FUNCTION FOR NAME MATCHES??

// FRIEND SEARCH EVENTS
const eventHub = document.querySelector(".container");

eventHub.addEventListener("friendAddClicked", (event) => {
  const contentTarget = document.querySelector("#friendSearch__container");
  contentTarget.innerHTML = FriendSearch();
});
eventHub.addEventListener("closeSearchClicked", (event) => {
  const contentTarget = document.querySelector("#friendSearch__container");
  contentTarget.innerHTML = "";
});

eventHub.addEventListener("keyup", (event) => {
  if (event.target.id === "friend--search") {
    renderResults(event.target.value);
  }
});
eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("search-userId")) {
    const [prefix, userId] = event.target.id.split("--");
    const activeUser = useActiveUser();
    const newFriend = {
      userId,
      activeUserId: activeUser.id,
    };
    saveFriend(newFriend);
  }
});
