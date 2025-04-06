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

// Card Infomation

const cardsBuild = (info) => {
  return /*html*/ `
    <div class="card">
        <h2 class="title">${info.name}</h2>
            <figure>
                <img src="${info.image}" alt="${info.name}" loading="lazy" />
                <figcaption>${info.name}</figcaption>
            </figure>
        <div class="card-content">
            <div class="card-info">
                <p><span class="label">Address:</span>${info.address}</p>
                <p><span class="label">Description:</span>${info.description}</p>
                </div>
            <button>learn more</button>
        </div>
    </div>`;
};

const requestData = async () => {
  const response = await fetch("data/discover.json");
  const data = await response.json();
  return data;
};

renderCards = async (classContainer) => {
  const data = await requestData();
  if (!data || data.length === 0) {
    console.error("No data available to render cards.");
    return;
  }
  const container = document.querySelector(classContainer);

  container.innerHTML = ""; // Clear the container before rendering new cards
  container.innerHTML = data.map(cardsBuild).join("");
};

renderCards(".container-discover");
