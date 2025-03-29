// TODO Toggle the navigation bar on mobile

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const toggleButton = document.querySelector("#navToggle");

  toggleButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});