import { getDataDirectory } from "./getData.js";

const spotlightContainer = document.getElementById("spotlight-container");

const renderSpot = (data) => {
  return `
    <div class="spotlight">
    <img src="${data.image}" alt="${data.name}">
        <h4>${data.name}</h4>
        <p>${data.additional_info}</p>
        <a href="tel:${data.phone}" class="phone">${data.phone}</a>
        <a href="${data.website}" class="website">${data.website}</a>
    </div>
  `;
};
const printSpotlights = async () => {
  const data = await getDataDirectory();

  const goldMembers = data.filter(
    (element) =>
      element.membership_level == "Gold" || element.membership_level == "Silver"
  );
  spotlightContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    if (goldMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * goldMembers.length);
      const randomMember = goldMembers.splice(randomIndex, 1)[0];
      spotlightContainer.innerHTML += renderSpot(randomMember);
    }
  }
};
printSpotlights();
