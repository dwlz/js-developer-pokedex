
const pokeApi = {}

function convertPokeApiDeatilToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot
    .type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    const forca = pokeDetail.stats.map((statsSlot) => statsSlot)
    pokemon.attack = forca[1].base_stat
    pokemon.defense = forca[2].base_stat
    

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDeatilToPokemon)

}

pokeApi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
}


pokeApi.getPokemons = function (offset = 0, limit = 5) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

   return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailsRaquests) => Promise.all(detailsRaquests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
} 

