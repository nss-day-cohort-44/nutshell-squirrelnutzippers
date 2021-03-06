import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { Nutshell } from "./Nutshell.js";
import { getActiveUser } from "./users/UserProvider.js";

const eventHub = document.querySelector(".container");
/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/

const isAuthenticated = () => {
  return sessionStorage.getItem("activeUser");
};

const loadApp = () => {
  if (isAuthenticated()) {
    getActiveUser().then(Nutshell);
  } else {
    LoginForm();
    RegisterForm();
  }
};

loadApp();

// listen for login/logout
eventHub.addEventListener("userAuthenticated", loadApp);
