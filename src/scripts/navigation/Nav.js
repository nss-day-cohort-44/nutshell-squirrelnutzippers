import { useActiveUser } from "../users/UserProvider.js";
import { ThemeToggle, ThemeToggleListeners } from "./ThemeToggle.js";

const contentTarget = document.querySelector(".nav__container");
export const Nav = () => {
  const activeUser = useActiveUser();
  const userName = activeUser.email.split("@")[0];
  contentTarget.innerHTML = `
    <div class="nav--logo">NUTSHELL</div>
    <div>${userName}'s Dashboard</div>
    <div class="nav--toggle">${ThemeToggle()}</div>
    `;

  ThemeToggleListeners();
};
