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
