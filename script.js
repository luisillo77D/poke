let pokemones = [];
const pokeContainer = document.getElementById("poke-container");
document.getElementById("save").addEventListener("click", async function () {
  const pokemonName = document.getElementById("name").value;
  pokemones.push(await getPokemon(pokemonName));
  console.log(pokemones);
});
async function getPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
}

document.getElementById("show").addEventListener("click", function () {
  displayPokemon();
});

function displayPokemon() {
  pokeContainer.innerHTML = "";
  pokemones.map((pokemon) => {
    console.log(pokemon);
    const div = document.createElement("div");
    div.innerHTML = `<h1>${pokemon.name}<span>  #${pokemon.id}</span> </h1>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <p>Altura: ${pokemon.height/10} m</p>
    <p>Peso: ${pokemon.weight/10} kg</p>
    <div>
    <h2>Tipos</h2>
    <ul>
    ${pokemon.types.map((type) => `<li>${type.type.name}</li>`).join("")}
    </ul>
    </div>

    `;
    pokeContainer.appendChild(div);
  });
}
