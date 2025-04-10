import { printCurrentYear, printLastModified, spinnerShow } from "./Util.mjs";
let comparisonList = [];
let pokemonNames = [];

const pokemonInput = document.getElementById("pokemonName");
const suggestionsContainer = document.getElementById("suggestions");
const searchButton = document.getElementById("searchButton");
const pokemonDetailsContainer = document.getElementById("pokemonDetails");
const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("comparateChart");

const initFunctions = () => {
  printCurrentYear("currentyear");
  printLastModified("lastModified");
  resetLocalStorage();
  loadPokemonNames();
  loadComparisonList();
};

const resetLocalStorage = () => {
  localStorage.removeItem("comparisonList"); // Clear the comparison list from localStorage
}
// Load Pokémon names from JSON
const loadPokemonNames = () => {
fetch("./data/poke_names.json")
  .then((response) => response.json())
  .then((data) => {
    pokemonNames = data.map((pokemon) => pokemon.name);
  });
}
// Handle input event in the input
pokemonInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const matches = pokemonNames.filter((name) => name.startsWith(query));

  // Show suggestions
  suggestionsContainer.innerHTML = matches
    .map((name) => `<div class="suggestion-item">${name}</div>`)
    .join("");

  // Enable or disable the search button
  searchButton.disabled = !pokemonNames.includes(query);

  // Handle click on a suggestion
  suggestionsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("suggestion-item")) {
      pokemonInput.value = e.target.textContent;
      suggestionsContainer.innerHTML = ""; // Clear suggestions
      searchButton.disabled = false; // Enable the button
    }
  });
});

// Handle click outside the suggestions container
document.addEventListener("click", (e) => {
  if (!suggestionsContainer.contains(e.target) && e.target !== pokemonInput) {
    suggestionsContainer.innerHTML = ""; // Clear suggestions
  }
});

// Initially disable the search button
searchButton.disabled = true;

// Function to create a basic card with Pokémon details
const createPokemonCard = (pokemon) => {
  return /*html*/ `
    <div class="pokemon-card">
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Weight:</strong> ${pokemon.weight}</p>
      <p class="capitalize"><strong>Types:</strong> ${pokemon.types
        .map((type) => type.type.name)
        .join(", ")}</p>
      <p><strong>Attacks:</strong></p>
      <ul>
        ${pokemon.moves
          .slice(0, 5) // Show only the first 5 moves
          .map((move) => `<li class="capitalize">${move.move.name}</li>`)
          .join("")}
      </ul>
      <button id="compareButton">Add to Comparison</button>
    </div>
  `;
};

// Function to fetch Pokémon data by ID from the PokéAPI
const fetchPokemonData = (pokemonId) => {
  spinnerShow();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      // Use the createPokemonCard function to display details
      pokemonDetailsContainer.innerHTML = createPokemonCard(data);
      ctx.style.display = "block"; // Show the chart canvas
      document.getElementById("pokemonSection").style.display = "grid";

      // Pass stats data to the chart
      const statsData = data.stats.map((stat) => stat.base_stat);
      updateChart(statsChart, { name: data.name, data: statsData });

      // Add event listener to "Add to Comparison" button
      document
        .getElementById("compareButton")
        .addEventListener("click", () => addToComparison(data));
        spinnerShow(false);
    })
    .catch((error) => {
      pokemonDetailsContainer.innerHTML = `<p>${error.message}</p>`;
      chartBuild(null, "myChart"); // Clear the chart in case of error
    });
};

// Handle click on the search button
searchButton.addEventListener("click", () => {
  const pokemonId = pokemonInput.value.trim();
  if (pokemonId) {
    fetchPokemonData(pokemonId);
  } else {
    pokemonDetailsContainer.innerHTML =
      "<p>Please enter a valid ID.</p>";
  }
});

// chart stat update function
const updateChart = (chart, newData) => {
  chart.data.datasets[0].label = newData.name;
  chart.data.datasets[0].data = newData.data;
  chart.update();
};

// chart build function
const chartBuild = (ctx) => {
  const data = {
    labels: [
      "HP",
      "ATTACK",
      "DEFENSE",
      "SPECIAL-ATTACK",
      "SPECIAL-DEFENSE",
      "SPEED",
    ],
    datasets: [
      {
        label: "name",
        data: [0, 0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  const config = {
    type: "radar",
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      scales: {
        r: {
          min: 0, // Set minimum value for the axes
        },
      },
    },
  };
  // Return the chart instance for future updates
  return new Chart(ctx, config);
};

// Function to update the comparison chart
const updateComparisonChart = (chart, comparisonData) => {
  if (comparisonData.length === 0) {
    document.getElementById("comparationTitle").style.display = "none"; // Hide the title if no data
    ctx2.style.display = "none"; // Hide the chart if no data
    return;
  }
  document.getElementById("comparationTitle").style.display = "block"; // Show the title if data is present
  ctx2.style.display = "block";
  chart.data.labels = [
    "HP",
    "ATTACK",
    "DEFENSE",
    "SPECIAL-ATTACK",
    "SPECIAL-DEFENSE",
    "SPEED",
  ];
  chart.data.datasets = comparisonData.map((pokemon) => ({
    label: pokemon.name,
    data: pokemon.stats,
    fill: true,
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
    borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`,
    pointBackgroundColor: "#fff",
    pointBorderColor: "#000",
  }));
  chart.update();
};

// Function to render the comparison list
const renderComparisonList = () => {
  const comparisonContainer = document.getElementById("comparisonList");
  comparisonContainer.innerHTML = comparisonList
    .map(
      (pokemon, index) => /*html*/ `
    <div class="comparison-item">
      <span class="capitalize">${pokemon.name}</span>
      <button class="remove-btn" data-index="${index}">X</button>
    </div>
  `
    )
    .join("");

  // Add event listeners to remove buttons
  comparisonContainer.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      comparisonList.splice(index, 1);
      localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
      renderComparisonList();
      updateComparisonChart(comparateChart, comparisonList);
    });
  });
};

// Add Pokémon to comparison list
const addToComparison = (pokemon) => {
  const pokemonData = {
    name: pokemon.name,
    stats: pokemon.stats.map((stat) => stat.base_stat),
  };

  // Validation to check if Pokémon is already in the comparison list
  if (comparisonList.some((p) => p.name === pokemonData.name)) {
   Swal.fire({
     toast: true,
     title: "Error!",
     text: `${pokemonData.name.toUpperCase()} is already in the comparison list.`,
     icon: "error",
     position: "top-end",
     showConfirmButton: false,
     timer: 3000,
     timerProgressBar: true,
   });
    return;
  }

  comparisonList.push(pokemonData);
  localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
  renderComparisonList();
  updateComparisonChart(comparateChart, comparisonList);
};

// Load comparison list from localStorage on page load
const loadComparisonList = () => {
  const storedComparisonList = JSON.parse(
    localStorage.getItem("comparisonList")
  );
  if (storedComparisonList) {
    comparisonList = storedComparisonList;
    renderComparisonList();
    updateComparisonChart(comparateChart, comparisonList);
  }
};

const adjustGraphSize = () => {
  const isMobile = window.innerWidth <= 768;
  const graphWidth = isMobile ? window.innerWidth * 0.5 : 500;

  ctx.width = graphWidth;
  ctx.height = graphWidth;
  ctx2.width = graphWidth;
  ctx2.height = graphWidth;
};

// Adjust graph size on page load and window resize
adjustGraphSize();
window.addEventListener("resize", adjustGraphSize);

const statsChart = chartBuild(ctx);
const comparateChart = chartBuild(ctx2);
initFunctions();




