import { useActiveUser } from "../users/UserProvider.js";
import { ThemeToggle, ThemeToggleListeners } from "./ThemeToggle.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector("#nav");

export const Nav = () => {
  render();
  ThemeToggleListeners();
};

const render = () => {
  const activeUser = useActiveUser();

  const userName = activeUser.email.split("@")[0];
  contentTarget.innerHTML += `
    <nav class="nav__container">
      <div class="nav--logo">NUTSHELL</div>
      <div class="nav--switches">
        <div class="nav--toggle">${ThemeToggle()}</div>
        <div>
          <i class="far fa-user"></i> ${userName}
          <button id="logout">logout</button>
        </div>
      </div>
    </nav>
    `;
};

// LOG OUT EVENT
eventHub.addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    sessionStorage.removeItem("activeUser");
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute("data-theme");
    // ! REPLACE next line with custom "logout" event
    clearContainers();
    eventHub.dispatchEvent(new CustomEvent("userAuthenticated"));
  }
});

const clearContainers = () => {
  // ! THIS COULD BE DONE DYNAMICALLY WITH A CONSISTENT CLASS NAMING CONVENTION OR ADDING EVENT LISTENERS TO INDIVIDUAL COMPONENTS TO LISTEN FOR LOGOUT
  const navContainer = document.querySelector("#nav");
  const messagesContainer = document.querySelector("#messages");
  const articlesContainer = document.querySelector("#articles");
  const eventsContainer = document.querySelector("#events");
  const tasksContainer = document.querySelector("#tasks");
  const friendsContainer = document.querySelector("#friends");
  const weatherContainer = document.querySelector("#weather");

  navContainer.innerHTML = "";
  messagesContainer.innerHTML = "";
  articlesContainer.innerHTML = "";
  eventsContainer.innerHTML = "";
  tasksContainer.innerHTML = "";
  friendsContainer.innerHTML = "";
  weatherContainer.innerHTML = "";
};
