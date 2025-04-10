import { printCurrentYear, printLastModified, spinnerShow } from "./Util.mjs";

const initFunctions = () => {
  printCurrentYear("currentyear");
  printLastModified("lastModified");
};

const getUrlApiTCG = (query) =>
  `https://api.pokemontcg.io/v2/cards?q=name:${query}*`;

const getCardTCG = (query) => {
  try {
    spinnerShow();
    return fetch(getUrlApiTCG(query))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Info of card not found");
        }
        return response.json();
      })
      .then((resoponse) => {
        spinnerShow(false);
        return resoponse.data;
      });
  } catch (error) {
    console.error("Error fetching card data", error);
  }
};

const createCardTCG = (card) => {
  return /*html */ `
    <div class="card">
      <picture>
        <source media="(min-width: 768px)" srcset="${
          card?.images?.large || ""
        }">
        <img src="${card?.images?.small || ""}" alt="${
    card?.name || "Unknown"
  }" loading="lazy" />
        ${
          card?.cardmarket?.prices?.trendPrice
            ? `<div class="price-ribbon">$${card.cardmarket.prices.trendPrice}</div>`
            : ""
        }
      </picture>
      <h3>${card?.name || "Unknown"}</h3>
      <p>Set: ${card?.set?.name || "N/A"}</p>
      <p>Release Date: ${card?.set?.releaseDate || "N/A"}</p>
      <p>Rarity: ${card?.rarity || "N/A"}</p>
      <div class="price-info">
        <h4>TCGPlayer</h4>
        <p>Updated At: ${card?.tcgplayer?.updatedAt || "N/A"}</p>
        <p><a href="${
          card?.tcgplayer?.url || "#"
        }" target="_blank">View on TCGPlayer</a></p>
        <ul>
          <li><b>Holofoil Prices: </b>
            <ul>
              <li>Low: $ ${
                card?.tcgplayer?.prices?.holofoil?.low || "N/A"
              } </li>
              <li>Mid: $ ${
                card?.tcgplayer?.prices?.holofoil?.mid || "N/A"
              } </li>
              <li>High: $ ${
                card?.tcgplayer?.prices?.holofoil?.high || "N/A"
              } </li>
              <li>Market: $ ${
                card?.tcgplayer?.prices?.holofoil?.market || "N/A"
              } </li>
            </ul>
          </li>
          <li><b>Reverse Holofoil Prices: </b>
            <ul>
              <li>Low: $ ${
                card?.tcgplayer?.prices?.reverseHolofoil?.low || "N/A"
              } </li>
              <li>Mid: $ ${
                card?.tcgplayer?.prices?.reverseHolofoil?.mid || "N/A"
              } </li>
              <li>High: $ ${
                card?.tcgplayer?.prices?.reverseHolofoil?.high || "N/A"
              } </li>
              <li>Market: $ ${
                card?.tcgplayer?.prices?.reverseHolofoil?.market || "N/A"
              } </li>
            </ul>
          </li>
        </ul>
        <h4>CardMarket</h4>
        <p>Updated At: ${card?.cardmarket?.updatedAt || "N/A"}</p>
        <p><a href="${
          card?.cardmarket?.url || "#"
        }" target="_blank">View on CardMarket</a></p>
        <ul>
          <li>Average Sell Price: $ ${
            card?.cardmarket?.prices?.averageSellPrice || "N/A"
          } </li>
          <li>Low Price: $ ${card?.cardmarket?.prices?.lowPrice || "N/A"} </li>
          <li>Trend Price: $ ${
            card?.cardmarket?.prices?.trendPrice || "N/A"
          } </li>
        </ul>
      </div>
    </div>
  `;
};
const noCardFound = () => {
  return /*html */ `
    <div class="card-not-found">
      <h3>No card found</h3>
    </div>
  `;
};

const sortCardsByPrice = (cards, order = "asc") => {
  return cards.sort((a, b) => {
    const priceA = a?.cardmarket?.prices?.trendPrice || Infinity;
    const priceB = b?.cardmarket?.prices?.trendPrice || Infinity;
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
};

document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("pokemonName").value.trim();
  if (query) {
    getCardTCG(query).then((cards) => {
      const cardContainer = document.getElementById("cardsContainer");
      if (cards.length === 0) {
        cardContainer.innerHTML = noCardFound();
        return;
      }
      // Save fetched cards to localStorage
      localStorage.setItem("fetchedCards", JSON.stringify(cards));
      cardContainer.innerHTML = cards.map(createCardTCG).join("");
    });
  }
});

document.getElementById("sortButton").addEventListener("click", () => {
  const sortOrder =
    document.getElementById("sortButton").dataset.order || "asc";
  const storedCards = localStorage.getItem("fetchedCards");
  if (storedCards) {
    const cards = JSON.parse(storedCards);
    const cardContainer = document.getElementById("cardsContainer");
    if (cards.length === 0) {
      cardContainer.innerHTML = noCardFound();
      return;
    }
    const sortedCards = sortCardsByPrice(cards, sortOrder);
    cardContainer.innerHTML = sortedCards.map(createCardTCG).join("");
    document.getElementById("sortButton").dataset.order =
      sortOrder === "asc" ? "desc" : "asc";
  }
});
initFunctions();