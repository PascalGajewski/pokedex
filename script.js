let currentId;
let currentPokemon;
let currentPokemonColor;
let currentPokemonEvolution;
let Pokemon;
let PokemonColor;
let PokemonEvolution;
let species = [];
let abilities = [];
let firstPokemon = 1;
let lastPokemon = 151;

async function render() {
    writePokemonHTML();
    document.getElementById('pokedex').innerHTML = ``;
    document.getElementById('pokedex').innerHTML += writeSearchBarHTML();
    loadPokedexPokemon().then(filterPokemon);
    document.getElementById('pokedex').innerHTML += writePokedexBtnsHTML();
}

async function loadPokedexPokemon() {
    for (let p = firstPokemon; p < lastPokemon; p++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${p}`;
        let response = await fetch(url).catch(errorFunction);
        Pokemon = await response.json();
        let urlColor = `${Pokemon['species']['url']}`;
        let responseColor = await fetch(urlColor).catch(errorFunction);
        PokemonColor = await responseColor.json();
        document.getElementById('pokemons').innerHTML += writePokedexPokemonsHTML(p, Pokemon);
        document.getElementById(`pokemon-id-${p}`).style.backgroundColor = PokemonColor['color']['name'];
    }
}

async function loadPokemon(p) {
    document.getElementById('pokedex').classList.add('d-none');
    document.getElementById('pokemon-card').classList.remove('d-none');
    let url = `https://pokeapi.co/api/v2/pokemon/${p}`;
    let response = await fetch(url).catch(errorFunction);
    currentPokemon = await response.json();
    await renderPokemonInfo();
    writePokemonDetailsHTML();
    renderPokemonDetails();
    currentId = p;
}

async function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    let urlcurrentColor = `${currentPokemon['species']['url']}`;
    let responsecurrentColor = await fetch(urlcurrentColor).catch(errorFunction);
    currentPokemonColor = await responsecurrentColor.json();
    if (currentPokemonColor['color']['name'] != "white" || currentPokemonColor['color']['name'] != "brown" || currentPokemonColor['color']['name'] != "purple") {
        document.getElementById('currentPokemon').style.backgroundColor = currentPokemonColor['color']['name'];
    }
    else {
        document.getElementById('currentPokemon').style.backgroundColor = currentPokemonColor['color']['name'];
    };
    if (currentPokemonColor['color']['name'] == "yellow" || currentPokemonColor['color']['name'] == "white") {
        document.getElementById('currentPokemon').style.color = `black`;
    };
}

async function renderPokemonDetails() {
    renderPokemonDetailsAbout();
    renderPokemonDetailsStats();
    await renderPokemonDetailsEvolution();
    renderPokemonDetailsMoves();
}

function renderPokemonDetailsAbout() {
    generateSpecies();
    document.getElementById('species').innerHTML = species;
    document.getElementById('height').innerHTML = currentPokemon['height'] + ` feet`;
    document.getElementById('weight').innerHTML = currentPokemon['weight'] + ` kg`;
    generateAbilities();
    document.getElementById('abilities').innerHTML = abilities;
    document.getElementById('pokemon-id').innerHTML = currentPokemon['id'];
}

function generateSpecies() {
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        if (i == 0) {
            species.push(capitalizeFirstLetter(currentPokemon['types'][i]['type']['name']));
        }
        else {
            species.push(` ` + capitalizeFirstLetter(currentPokemon['types'][i]['type']['name']));
        }
    };
}

function generateAbilities() {
    for (let j = 0; j < currentPokemon['abilities'].length; j++) {
        if (j == 0) {
            abilities.push(capitalizeFirstLetter(currentPokemon['abilities'][j]['ability']['name']));
        }
        else {
            abilities.push(` ` + capitalizeFirstLetter(currentPokemon['abilities'][j]['ability']['name']));
        }
    };
}

function renderPokemonDetailsStats() {
    document.getElementById('hp').innerHTML = currentPokemon['stats'][0]['base_stat'];
    document.getElementById('hp-bar').style.width = currentPokemon['stats'][0]['base_stat'] + `%`;
    document.getElementById('attack').innerHTML = currentPokemon['stats'][1]['base_stat'];
    document.getElementById('attack-bar').style.width = currentPokemon['stats'][1]['base_stat'] + `%`;
    document.getElementById('defense').innerHTML = currentPokemon['stats'][2]['base_stat'];
    document.getElementById('defense-bar').style.width = currentPokemon['stats'][2]['base_stat'] + `%`;
    document.getElementById('special-attack').innerHTML = currentPokemon['stats'][3]['base_stat'];
    document.getElementById('special-attack-bar').style.width = currentPokemon['stats'][3]['base_stat'] + `%`;
    document.getElementById('special-defense').innerHTML = currentPokemon['stats'][4]['base_stat'];
    document.getElementById('special-defense-bar').style.width = currentPokemon['stats'][4]['base_stat'] + `%`;
    document.getElementById('speed').innerHTML = currentPokemon['stats'][5]['base_stat'];
    document.getElementById('speed-bar').style.width = currentPokemon['stats'][5]['base_stat'] + `%`;
}

async function renderPokemonDetailsEvolution() {
    let urlEvolution = `${currentPokemonColor['evolution_chain']['url']}`;
    let responseEvolution = await fetch(urlEvolution).catch(errorFunction);
    currentPokemonEvolution = await responseEvolution.json();
    document.getElementById('evolution-info').innerHTML = ``;
    writeNoEvolution();
    writeEvolutionFrom();
    writeEvolvesToFirst();
    writeEvolvesToSecond();
}

function writeNoEvolution() {
    if (currentPokemonColor['evolves_from_species'] == null && currentPokemonEvolution['chain']['evolves_to'].length == 0) {
        document.getElementById('evolution-info').innerHTML += `
        This Pokemon has no evolution.
        `;
    }
}

function writeEvolutionFrom() {
    if (currentPokemonColor['evolves_from_species'] !== null) {
        document.getElementById('evolution-info').innerHTML += `
            <tr>
            <td class="grey">Evolves from</td>
            <td class="black">${capitalizeFirstLetter(currentPokemonColor['evolves_from_species']['name'])}</td>
            </tr>
            `;
    }
}

function writeEvolvesToFirst() {
    if (currentPokemon['name'] == currentPokemonEvolution['chain']['species']['name'] && currentPokemonEvolution['chain']['evolves_to'].length > 0) {
        document.getElementById('evolution-info').innerHTML += `
            <tr>
            <td class="grey">Evolves to</td>
            <td class="black">${capitalizeFirstLetter(currentPokemonEvolution['chain']['evolves_to'][0]['species']['name'])}</td>
            </tr>
            `;
    }
}

function writeEvolvesToSecond() {
    if (currentPokemonEvolution['chain']['evolves_to'][0] && currentPokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0] && (currentPokemon['name'] !== currentPokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'])) {
        document.getElementById('evolution-info').innerHTML += `
            <tr>
            <td class="grey">Evolves to</td>
            <td class="black">${capitalizeFirstLetter(currentPokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'])}</td>
            </tr>
            `;
    }
}

function renderPokemonDetailsMoves() {
    document.getElementById('moves-info').innerHTML = ``;
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        document.getElementById('moves-info').innerHTML += `
    <tr>
    <td class="grey">At Level ${currentPokemon['moves'][i]['version_group_details'][0]['level_learned_at']}</td>
    <td class="black">${capitalizeFirstLetter(currentPokemon['moves'][i]['move']['name'])}</td>
    </tr>
    `;
    }
}

function backToPokedex() {
    window.location.assign("index.html");
}

function loadMorePokemon() {
    firstPokemon = lastPokemon;
    lastPokemon = lastPokemon + 50;
    document.getElementById('displayed-pokemon').innerHTML = ``;
    document.getElementById('displayed-pokemon').innerHTML += `Pokemon Nr. 1 - ${lastPokemon - 1} displayed`;
    loadPokedexPokemon();
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function bottomFunction() {
    document.body.scrollTo(0, document.body.scrollHeight); // For Safari
    document.documentElement.scrollTo(0, document.body.scrollHeight); // For Chrome, Firefox, IE and Opera
}

function filterPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    for (let i = 1; i < lastPokemon; i++) {
        if (!document.getElementById(`pokemon-id-${i}-name`).innerHTML.toLowerCase().includes(search)) {
            document.getElementById(`pokemon-id-${i}`).classList.add('d-none');
        };
        if (document.getElementById(`pokemon-id-${i}-name`).innerHTML.toLowerCase().includes(search) && document.getElementById(`pokemon-id-${i}`).classList.contains('d-none')) {
            document.getElementById(`pokemon-id-${i}`).classList.remove('d-none');
        }
    }
};

async function previousPokemon() {
    currentId--;
    reloadPokemon(currentId)
}

async function nextPokemon(p) {
    currentId++;
    reloadPokemon(currentId)
}

function errorFunction() {
    console.log('Fehler aufgetreten');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function reloadPokemon(currentId){
    species = [];
    abilities = [];
    let url = `https://pokeapi.co/api/v2/pokemon/${currentId}`;
    let response = await fetch(url).catch(errorFunction);
    currentPokemon = await response.json();
    writePokemonHTML();
    await renderPokemonInfo();
    writePokemonDetailsHTML();
    renderPokemonDetails();
}

function hideBtn(){
    if(currentId == 1 && !document.getElementById('myBtnBack').classList.contains('d-none')){
        document.getElementById('myBtnBack').classList.add('d-none');
    }
}
