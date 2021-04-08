let darkMode = localStorage.getItem("darkMode");

const btn = document.querySelector("#Theme");
const bg = document.querySelector(".bg-Todo");
const changeTheme = document.querySelector("#change-theme");

const enableDarkMode = () => {
  document.body.classList.add("darkMode");
  bg.setAttribute("src", "images/bg-desktop-dark.jpg");
  changeTheme.setAttribute("src", "images/icon-sun.svg");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkMode");
  bg.setAttribute("src", "images/bg-desktop-light.jpg");
  changeTheme.setAttribute("src", "images/icon-moon.svg");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  darkMode = localStorage.getItem("darkMode");

  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
