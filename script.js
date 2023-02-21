let currentPokemon;
let currentPokemonColor;
let currentPokemonEvolution;
let species = [];
let abilities = [];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    await renderPokemonInfo();
    writePokemonDetailsHTML();
    renderPokemonDetails();
}

async function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    let urlColor = `${currentPokemon['species']['url']}`;
    let responseColor = await fetch(urlColor);
    currentPokemonColor = await responseColor.json();
    document.getElementById('currentPokemon').style.backgroundColor = `light` + currentPokemonColor['color']['name'];
    console.log(currentPokemonColor);
}

async function renderPokemonDetails() {
    renderPokemonDetailsAbout();
    renderPokemonDetailsStats();
    renderPokemonDetailsEvolution();
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
    let responseEvolution = await fetch(urlEvolution);
    currentPokemonEvolution = await responseEvolution.json();
    console.log(currentPokemonEvolution);
    document.getElementById('evolution-info').innerHTML = ``;
    document.getElementById('evolution-info').innerHTML += `
    This Pokemon has no evolution.
    `;
    writeEvolutionFrom();
    writeEvolvesToFirst();
    writeEvolvesToSecond();
}

function writeEvolutionFrom() {
    if (currentPokemonColor['evolves_from_species'] !== null) {
        document.getElementById('evolution-info').innerHTML = ``;
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
        document.getElementById('evolution-info').innerHTML = ``;
        document.getElementById('evolution-info').innerHTML += `
            <tr>
            <td class="grey">Evolves to</td>
            <td class="black">${capitalizeFirstLetter(currentPokemonEvolution['chain']['evolves_to'][0]['species']['name'])}</td>
            </tr>
            `;
    }
}

function writeEvolvesToSecond() {
    if (currentPokemonEvolution['chain']['evolves_to'].length > 0 && currentPokemon['name'] == currentPokemonEvolution['chain']['evolves_to'][0]['species']['name']) {
        document.getElementById('evolution-info').innerHTML = ``;
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
    <td class="black">${currentPokemon['moves'][i]['move']['name']}</td>
    </tr>
    `;
    }
}