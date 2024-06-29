import { getLocalStorage, setLocalStorage } from './local-storage-helpers.js';
import { createPokemonCard } from './dom.js';
  
  // Function to fetch data from an API
   export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
          throw new Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }
        const isJson = (response.headers.get('content-type') || '').includes('application/json');
        const data = isJson ? await response.json() : await response.text();
        return [data, null];
      } catch (error) {
        console.error(error.message);
        return [null, error];
      }
    };
    
    // Function to fetch Pokémon details by name
   export  const fetchPokemonDetails = async (name) => {
      const localData = getLocalStorage(name);
      if (localData) {
        console.log(`Fetched ${name} from local storage.`);
        return localData;
      }
    
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      const [data, error] = await fetchData(url);
      if (error) {
        console.error(`Cannot fetch details for ${name}`);
        return null;
      }
      setLocalStorage(name, data);  // Save fetched data to local storage
      return data;
    };
    
    // Function to fetch Pokémon names and their details
   export const fetchDataNames = async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/?&limit=20';
      const [data, error] = await fetchData(url);
      if (error) {
        console.error('Cannot fetch names');
        return;
      }
    
      const allPokemon = data.results;
      const pokemonCard = document.querySelector('#fetch-cards');
    
      allPokemon.forEach(async (pokemon) => {
        try {
          const details = await fetchPokemonDetails(pokemon.name);
          const card = createPokemonCard(details);
          pokemonCard.append(card);
        } catch (error) {
          console.warn('Failed to fetch Pokémon details for', pokemon.name);
        }
      });
    };
    