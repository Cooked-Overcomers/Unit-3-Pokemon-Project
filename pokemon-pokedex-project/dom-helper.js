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
searchForPokemon();