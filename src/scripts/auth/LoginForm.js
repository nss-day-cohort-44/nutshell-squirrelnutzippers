const contentTarget = document.querySelector(".auth--login");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("userAuthenticated", (e) => {
  contentTarget.innerHTML = "";
});

eventHub.addEventListener("click", (e) => {
  if (e.target.id === "login__button") {
    const username = document.querySelector("#login__username").value;
    // CHECK USERNAME AND EMAIL MATCH
    const email = document.querySelector("#login__email").value;

    return fetch(`http://localhost:8088/users?username=${username}`)
      .then((response) => response.json())
      .then((users) => {
        if (users.length > 0) {
          const user = users[0];
          sessionStorage.setItem("activeUser", user.id);
          eventHub.dispatchEvent(new CustomEvent("userAuthenticated"));
        }
      });
  }
});

const render = () => {
  contentTarget.innerHTML = `
  <h1 class="nav--logo center">NUTSHELL</h1>
    <section class="login form">
        <input id="login__username" type="text" placeholder="Enter your username">
        <input id="login__email" type="text" placeholder="Enter your email">
        <button id="login__button">Log In</button>
    </section>
    `;
};

export const LoginForm = () => {
  render();
};
