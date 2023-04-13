const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 5;
let offset = 0;
 
function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
        `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    <span class="power">Força: <span class="num">${pokemon.attack}</span> </span>
                    <span class="power">Defesa:<span class="num">${pokemon.defense}</span></span>
                    
                </ol>
        
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>`
         ).join('')

        pokemonList.innerHTML += newHtml
    })
    
}





loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= maxRecords ) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {

    loadPokemonItens(offset, limit)
    }
})
    
