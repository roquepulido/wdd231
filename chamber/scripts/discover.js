const getLastModification = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
document.getElementById("year").innerText = new Date().getFullYear();
document.getElementById(
  "lastModified"
).innerText = `Last Modification: ${getLastModification(
  document.lastModified
)}`;

//Hamburger button
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});
