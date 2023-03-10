function writePokemonHTML() {
    document.getElementById('pokemon-card').innerHTML = ``;
    document.getElementById('pokemon-card').innerHTML += `
    <div class="pb-5 pt-5 d-flex"><button type="button" class="btn btn-secondary btn-lg mx-auto" onclick="backToPokedex()">Back to Pokedex</button></div>
    <div id="currentPokemon">
        <h1 id="pokemonName"></h1>
        <img id="pokemonImage">
    </div>
    <div class="info-container">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="about-tab" data-bs-toggle="tab" data-bs-target="#about-tab-pane"
                    type="button" role="tab" aria-controls="about-tab-pane" aria-selected="true">About</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="base-stats-tab" data-bs-toggle="tab"
                    data-bs-target="#base-stats-tab-pane" type="button" role="tab"
                    aria-controls="base-stats-tab-pane" aria-selected="false">Base Stats</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="evolution-tab" data-bs-toggle="tab"
                    data-bs-target="#evolution-tab-pane" type="button" role="tab" aria-controls="evolution-tab-pane"
                    aria-selected="false">Evolution</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="moves-tab" data-bs-toggle="tab" data-bs-target="#moves-tab-pane"
                    type="button" role="tab" aria-controls="moves-tab-pane" aria-selected="false">Moves</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="about-tab-pane" role="tabpanel" aria-labelledby="about-tab"
                tabindex="0">
                <table id="about-info">
                </table>
            </div>
            <div class="tab-pane fade" id="base-stats-tab-pane" role="tabpanel" aria-labelledby="base-stats-tab"
                tabindex="0">
                <table id="base-stats-info">
                </table>
            </div>
            <div class="tab-pane fade" id="evolution-tab-pane" role="tabpanel" aria-labelledby="evolution-tab"
                tabindex="0">
                <table id="evolution-info">
                </table>
            </div>
            <div class="tab-pane fade" id="moves-tab-pane" role="tabpanel" aria-labelledby="moves-tab" tabindex="0">
                <table id="moves-info">
                </table>
            </div>
        </div>
    </div>
`
}


function writePokemonDetailsHTML(){
    writeAboutInfoHTML();
    writeBaseStatsInfoHTML();  
}

function writeAboutInfoHTML() {
    document.getElementById('about-info').innerHTML = ``;
    document.getElementById('about-info').innerHTML += `
    <tr>
    <td class="grey">Species</td>
    <td id="species" class="black"></td>
</tr>
<tr>
    <td class="grey">Height</td>
    <td id="height" class="black"></td>
</tr>
<tr>
    <td class="grey">Weight</td>
    <td id="weight" class="black"></td>
</tr>
<tr>
    <td class="grey">Abilities</td>
    <td id="abilities" class="black"></td>
</tr>
<tr>
    <td class="grey">Pokemon ID</td>
    <td id="pokemon-id" class="black"></td>
</tr>
`
}

function writeBaseStatsInfoHTML() {
    document.getElementById('base-stats-info').innerHTML = ``;
    document.getElementById('base-stats-info').innerHTML += `
    <tr>
    <td class="grey w-50">HP</td>
    <td id="hp" class="black w-5"></td>
    <td class="bar-spacing">
        <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped bg-danger" id="hp-bar"></div>
        </div>
    </td>
</tr>
<tr>
    <td class="grey w-50">Attack</td>
    <td id="attack" class="black w-5"></td>
    <td class="bar-spacing">
        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped" id="attack-bar"></div>
        </div>
    </td>
</tr>
<tr>
    <td class="grey w-50">Defense</td>
    <td id="defense" class="black w-5"></td>
    <td class="bar-spacing">
        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped" id="defense-bar"></div>
        </div>
    </td>
</tr>
<tr>
    <td class="grey w-50">Special-attack</td>
    <td id="special-attack" class="black w-5"></td>
    <td class="bar-spacing">
        <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped bg-info" id="special-attack-bar"></div>
        </div>
    </td>
</tr>
<tr>
    <td class="grey w-50">Special-defense</td>
    <td id="special-defense" class="black w-5"></td>
    <td class="bar-spacing">
        <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped bg-info" id="special-defense-bar"></div>
        </div>
    </td>
</tr>
<tr>
    <td class="grey w-50">Speed</td>
    <td id="speed" class="black w-5"></td>
    <td class="bar-spacing">
        <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped bg-warning" id="speed-bar"></div>
        </div>
    </td>
</tr>
`;
}

function writeSearchBarHTML(){
    return `
    <div class="search-bar">
        <span class="ps-2 space-bar" id="displayed-pokemon">Pokemon Nr. 1 - ${lastPokemon - 1} displayed</span>
        <input class="text-center mt-2 mb-2" type="text" placeholder="Search Pokemon" id="search" onkeyup="filterPokemon()">
        <span class="pe-2 space-bar"></span>
    </div>
    <div class="w-100 pt-5 text-center"><h1>Pokedex</h1></div>
    <div id="pokemons"></div>
    `;
}

function writePokedexBtnsHTML(){
    return  `
    <div class="pt-5 pb-5 d-flex"><button type="button" class="btn btn-secondary btn-lg mx-auto" onclick="loadMorePokemon()">Load more Pokemons</button></div>
    <button onclick="topFunction()" id="myBtnTop" title="Go to top">∧</button>
    <button onclick="bottomFunction()" id="myBtnBtm" title="Go to bottom">∨</button>
    `;
}

function writePokedexPokemonsHTML(p, Pokemon){
    return  `
    <div class="pokedex-card" id="pokemon-id-${p}" onclick="loadPokemon(${p})">
        <h3 id="pokemon-id-${p}-name">${capitalizeFirstLetter(Pokemon['name'])}</h3>
        <img class="pokedex-card-img" id="pokemon-id-${p}-img" src="${Pokemon['sprites']['other']['dream_world']['front_default']}">
    </div>
    `;
}
