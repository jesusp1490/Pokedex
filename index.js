const fetchPokemon = async () => {

    for (let i = 1; i <= 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const api = await response.json();
        const pokemon = {
            name: api.name,
            image: api.sprites["front_default"],
            image2: api.sprites["back_default"],
            type: api.types.map((type) => type.type.name),
            abilities: api.abilities.map((abilityObj) => abilityObj.ability.name).join(", "),
        };

        allPokemonData.push(pokemon);
        displayPokemon(pokemon);
    }

};

const displayPokemon = (pokemon) => {

    //Card   
    const listItem = document.createElement("div");
    listItem.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList = "card-inner";

    const cardFront = document.createElement("div");
    cardFront.classList = (`${pokemon.type[0]}`);
    cardInner.appendChild(cardFront);

    const cardBack = document.createElement("div");
    cardBack.classList = "card-back";
    cardInner.appendChild(cardBack);
    //Names
    const pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.name;
    pokemonName.classList.add("card-title");
    cardFront.appendChild(pokemonName);
    //Images Front
    const pokemonImageFront = document.createElement("img");
    pokemonImageFront.src = pokemon.image;
    pokemonImageFront.alt = pokemon.name;
    pokemonImageFront.classList.add("card-image");
    cardFront.appendChild(pokemonImageFront);
    //Types
    const pokemonType = document.createElement("h3");
    pokemonType.textContent = `Type: ${pokemon.type[0]}`;
    pokemonType.classList.add("card-subtitle", "card-title");
    cardFront.appendChild(pokemonType);
    //Abilities
    const pokemonAbilities = document.createElement("p");
    pokemonAbilities.textContent = `Abilities: ${pokemon.abilities}`;
    pokemonAbilities.classList.add("card-subtitle");
    cardFront.appendChild(pokemonAbilities);
    //Appends  
    listItem.appendChild(cardInner);
    pokedexList.appendChild(listItem);
    //Flip Event
    cardInner.addEventListener("click", () => {
        cardInner.classList.toggle("is-flipped");
    });

};

//Search Pokemon
const pokedexList = document.getElementById("pokedex");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const allPokemonData = [];

//Clean list
const filterPokemon = (searchTerm) => {
    pokedexList.innerHTML = "";

    //Filter
    for (const pokemon of allPokemonData) {
        if (
            pokemon.name.toLowerCase().includes(searchTerm) ||
            pokemon.type[0].toLowerCase().includes(searchTerm) ||
            pokemon.abilities.toLowerCase().includes(searchTerm)
        ) {
            displayPokemon(pokemon);
        }
    }
};

//Click 
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterPokemon(searchTerm);
});
//Keydown
searchInput.addEventListener("keydown", (event) => {
    const searchTerm = searchInput.value.toLowerCase();
    if (event.key === "Enter") {
        filterPokemon(searchTerm);
    }

});

//Type Filter
// const types = ['fire', 'water', 'grass', 'electric', 'psychic', 'fairy', 'fighting', 'dragon', 'dark', 'metal'];

// const typeButtonsContainer = document.querySelector('.typeFilter');

// function createTypeButton(type) {
//     const button = document.createElement('button');
//     button.classList.add('typeButton');
//     button.dataset.type = type;

//     const img = document.createElement('img');
//     img.src = `Assets/typeIcons/${type}_icon.png`;
//     button.appendChild(img);

//     button.addEventListener('click', function () {
//         toggleActive(this);
//         const selectedType = this.getAttribute('data-type');
//         // Realiza alguna acción con el tipo seleccionado aquí
//     });

//     return button;
// }

// function toggleActive(button) {
//     const buttons = document.querySelectorAll('.typeButton');
//     buttons.forEach((btn) => {
//         if (btn === button) {
//             btn.classList.add('active');
//         } else {
//             btn.classList.remove('active');
//         }
//     });
// }

// types.forEach((type) => {
//     const typeButton = createTypeButton(type);
//     typeButtonsContainer.appendChild(typeButton);
// });

fetchPokemon();

