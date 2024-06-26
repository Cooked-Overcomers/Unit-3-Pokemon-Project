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

  const pokemonType = document.createElement('p')
  pokemonType.textContent = `Type(s): ${pokemonDetails.types.map(type => type.type.name).join(', ')}`// 

  const regularPokemonImages = pokemonImages(pokemonDetails.sprites.front_default)
  const shinyPokemonImages = pokemonImages(pokemonDetails.sprites.front_shiny)

  shinyPokemonImages.style.display = "none"

  // flag that is 
  let isRegular = true;

  // wether to display the shiny or regular
  // if true it will display regular
  // if false it will display shiny
  //true and false 
  card.addEventListener("click", () => {
    isRegular = !isRegular // 
    if(!isRegular){
      shinyPokemonImages.style.display = "block"
      regularPokemonImages.style.display = "none"
    } else  {
      shinyPokemonImages.style.display = "none"
      regularPokemonImages.style.display = "block"
    }
  })

 

  // const type = document.createElement("p")
  card.append(name)
  card.append(regularPokemonImages)
  card.append(shinyPokemonImages)
  card.appendChild(height)
  card.appendChild(weight)
  card.appendChild(pokemonType)
  

  return card
  //   const img = document.createElement('img')

}

// Making the images

const pokemonImages = (imageSource) => {
// creating the img tag
const imageElement = document.createElement("img")
// add the src attribute
imageElement.src = imageSource
imageElement.alt =  "pokemon-image"
// gives the class name
imageElement.classList.add("image")

return imageElement


}
fetchDataNames()