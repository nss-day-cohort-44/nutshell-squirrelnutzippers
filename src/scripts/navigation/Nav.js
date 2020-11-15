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
      <div>${userName}'s Dashboard</div>
      <div class="nav--toggle">${ThemeToggle()}</div>
      <button id="logout">logout</button>
    </nav>
    `;
};

// LOG OUT EVENT
eventHub.addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    sessionStorage.removeItem("activeUser");
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute("data-theme");
    clearContainers();
    eventHub.dispatchEvent(new CustomEvent("userAuthenticated"));
  }
});

const clearContainers = () => {
  const navContainer = document.querySelector("#nav");
  const messagesContainer = document.querySelector("#messages");
  const articlesContainer = document.querySelector("#articles");

  navContainer.innerHTML = "";
  messagesContainer.innerHTML = "";
  articlesContainer.innerHTML = "";
};
