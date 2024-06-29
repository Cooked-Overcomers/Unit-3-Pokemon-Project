
  import { getLocalStorage, setLocalStorage } from './local-storage-helpers.js';
import { fetchPokemonDetails } from './fetchData.js';

// Helper function to create a Pokémon card
export const createPokemonCard = (pokemonDetails) => {
  const card = document.createElement("li");
  card.classList.add("pokemon-card");

  const name = document.createElement("h3");
  name.textContent = pokemonDetails.name;

  const height = document.createElement("p");
  height.textContent = `Height: ${pokemonDetails.height}`;

  const weight = document.createElement("p");
  weight.textContent = `Weight: ${pokemonDetails.weight}`;

  const pokemonType = document.createElement('p');
  pokemonType.textContent = `Type(s): ${pokemonDetails.types.map(type => type.type.name).join(', ')}`;

  const regularPokemonImages = pokemonImages(pokemonDetails.sprites.front_default);
  const shinyPokemonImages = pokemonImages(pokemonDetails.sprites.front_shiny);

  shinyPokemonImages.style.display = "none";

  let isRegular = true;

  card.addEventListener("click", () => {
    isRegular = !isRegular;
    if (isRegular) {
      shinyPokemonImages.style.display = "none";
      regularPokemonImages.style.display = "block";
    } else {
      shinyPokemonImages.style.display = "block";
      regularPokemonImages.style.display = "none";
    }
  });

  card.append(name);
  card.append(regularPokemonImages);
  card.append(shinyPokemonImages);
  card.appendChild(height);
  card.appendChild(weight);
  card.appendChild(pokemonType);

  return card;
};

// Helper function to create an image element
export const pokemonImages = (imageSource) => {
  const imageElement = document.createElement("img");
  imageElement.src = imageSource;
  imageElement.alt = "pokemon-image";
  imageElement.id ='random'
  imageElement.classList.add("image");

  return imageElement;
};

// Function to render searched Pokémon from local storage
export const renderSearchedPokemon = () => {
  const accessResult = document.querySelector('#search-list');
  accessResult.innerHTML = ''; // Clear existing content
  const storedSearchedPokemon = getLocalStorage('searchedPokemon') || [];
  storedSearchedPokemon.forEach(pokemon => {
    const searchCard = createPokemonCard(pokemon);
    accessResult.append(searchCard);
  });
};

// Function to handle Pokémon search and store it in local storage
export const searchValue = async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#pokemon-search").value.trim().toLowerCase();
  if (!searchInput) {
    alert("Please enter a Pokémon name.");
    return;
  }

  const userInput = await fetchPokemonDetails(searchInput);
  if (userInput) {
    const storedSearchedPokemon = getLocalStorage('searchedPokemon') || [];
    if (!storedSearchedPokemon.find(pokemon => pokemon.name === userInput.name)) {
      storedSearchedPokemon.push(userInput);
      setLocalStorage('searchedPokemon', storedSearchedPokemon);
    }
    renderSearchedPokemon();
  } else {
    alert('Pokémon not found.');
  }
};
