import './main.js'
import './index.html'

// Making the submit button work
function searchValue (e) {
e.preventDefault()
const accessSubmit = document.querySelector("#pokemon-search").value // accessing the submit button
console.log(accessSubmit)
}
document.querySelector("#search-form").addEventListener("submit", searchValue)


// making the first card
const accessSubmit = document.querySelector("#pokemon-search").value // accessing the submit button
console.log(accessSubmit)


// Selecting the unordered list
const htmlUnorderedList = document.querySelector("#search-list")

// creating the delete button div for the card
const deleteButtonDiv =  document.createElement('div'); deleteButtonDiv.setAttribute('id', 'delete-pokemon-card')

// creating the deleteButton constant to make the actual button
const deleteButton = document.createElement('button');
deleteButton.setAttribute('id', 'delete');
deleteButtonDiv.append(deleteButton)

// prevent default
const searchForPokemon = (e) => {
    // stop the reload/redirect
    e.preventDefault();
}

function renderPokemon(pokeData){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    let pokeName = document.createElement('h4')
    pokeName.innerText = pokeData.name
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${allInfo.name}`
    let pokeTypes = document.createElement('ul') 
    //ul list will hold the pokemon types
    createTypes(pokeData.types, pokeTypes) 
    // helper function to go through the types array and create li tags for each one
    pokeContainer.append(pokeName, pokeNumber, pokeTypes);   
    //appending all details to the pokeContainer div
    allPokemonContainer.appendChild(pokeContainer);       
    //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
    }

