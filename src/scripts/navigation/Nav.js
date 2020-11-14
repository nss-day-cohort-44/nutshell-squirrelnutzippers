import { useActiveUser } from "../users/UserProvider.js";
import { ThemeToggle, ThemeToggleListeners } from "./ThemeToggle.js";

const eventHub = document.querySelector(".container");

const contentTarget = document.querySelector(".dashboard");
export const Nav = () => {
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

  ThemeToggleListeners();
};

eventHub.addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    sessionStorage.removeItem("activeUser");
    localStorage.removeItem("theme");
    contentTarget.innerHTML = "";
    eventHub.dispatchEvent(new CustomEvent("userAuthenticated"));
  }
});
