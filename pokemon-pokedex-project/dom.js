import { fetchData, fetchPokemonDetails } from "./fetchData.js"

const fetchDataNames = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/?&limit=20';
  const [data, error] = await fetchData(url);
  if (error) {
    console.error('Cannot fetch names');
    return;
  }

  const allPokemon = data.results
  const pokemonCard = document.querySelector('#fetch-cards')



  allPokemon.forEach(async (pokemon) => {
    try {
      const details = await fetchPokemonDetails(pokemon.name) // putting in pokemon will give us an array of objects and .name
      const card = createPokemonCard(details)
      pokemonCard.append(card)

    } catch (error) {
      console.warn("failed to fetch pokemon name")
    }
  })
};

// This is a helper function bc it is a reusable 
const createPokemonCard = (pokemonDetails) => {
  const card = document.createElement("li")
  card.classList.add("pokemon-card")
  const name = document.createElement("h3")
  name.textContent = pokemonDetails.name
  const height = document.createElement("p")
  height.textContent = `Height: ${pokemonDetails.height}`
  const weight = document.createElement("p")
  weight.textContent = `Weight: ${pokemonDetails.weight}`
  // const type = document.createElement("p")
  card.append(name)
  card.appendChild(height)
  card.appendChild(weight)


  return card
  //   const img = document.createElement('img')

}

fetchDataNames()