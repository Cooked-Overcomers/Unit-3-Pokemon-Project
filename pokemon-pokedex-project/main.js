import './style.css'

import { fetchDataNames } from './fetchData.js';
import { searchValue, renderSearchedPokemon } from './dom.js';

// Fetch and display Pokémon names and details on page load
document.querySelector("#search-bar").addEventListener('submit', searchValue);
renderSearchedPokemon();
fetchDataNames();
