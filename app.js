// add the reference to link to the html's ULs
const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {

    // empty array of promises
    const promises = [];

    //iterate thru all 150 and log it out
    for (let i = 1; i <= 150; i++) { 
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        // for each one of our requests, push that promise onto our list of promises
        promises.push(fetch(url).then((res) => res.json()));
    }
    
    // lets every individual asynchronally run in paralell
    Promise.all(promises).then((results) => {

        // create the pokemon
        // initialize it all in one line so we dont have to recreate it
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites["front_default"],
            shiny: result.sprites["front_shiny"],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

// call this function...
// we want to take each pokemon, and transform it into something that fits the format
const displayPokemon = (pokemon) => {
    console.log(pokemon);

    // 
    const pokemonHTMLString = pokemon
        .map(
            // name for each individual pokemon: poke
            // when poke is called, a list (li) of strings is returned
            (poke) => `
        <li class="card">
            <img class="card-image" src="${poke.image}"/>

            <h2 class="card-title">${poke.id}. ${poke.name}</h2>

            <p class="card-subtitle">Type: ${poke.type}</p>

            <a class="btn btn-success" href="https://www.serebii.net/pokedex-swsh/${poke.name}/" role="button">Serebii Info</a>
        </li>
    `
        )
        // (above) display image, name, then type
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
