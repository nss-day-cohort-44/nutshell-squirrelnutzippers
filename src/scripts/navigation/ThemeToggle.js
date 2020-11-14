export const ThemeToggle = () => {
  return `
    <div class="theme-switch-wrapper">
        <span class="before">Light</span>
        <label class="theme-switch" for="checkbox">
        <input type="checkbox" id="checkbox" />
        <div class="slider round"></div>
        </label>
        <span class="after">Dark</span>
    </div>
`;
};

// TOGGLE THEME
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

export const ThemeToggleListeners = () => {
  // TOGGLE ELEMENT
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  // EVENT LISTENER
  toggleSwitch.addEventListener("change", switchTheme, false);

  // CHECK BROWSER FOR EXISTING THEME
  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }
};
