let pokeEquipo = [];
let equipos = [];
const pokeContainer = document.getElementById("poke-container");
const pokeContainerEquipo = document.getElementById("poke-container-equipo");
const pokeInput = document.getElementById("name");
//objeto con los colores de los tipos de pokemon
const colors = {
  fire: "#fddfdf",
  grass: "#defde0",
  electric: "#fcf7de",
  water: "#def3fd",
  ground: "#BB8C5C",
  rock: "#96631E",
  fairy: "#fceaff",
  poison: "#EB70FF",
  bug: "#219929",
  dragon: "#A0DCD8",
  psychic: "#F04FCE",
  flying: "#C2E0E0",
  fighting: "#DB6E28",
  normal: "#DAC7D6",
};
let colorFondo;

document.getElementById("save").addEventListener("click", async function () {
  const pokemonName = pokeInput.value;
  if (!pokemonName) {
    showAlert("Ingrese un nombre de pokemon");
    return;
  }
  const pokemon = await getPokemon(pokemonName);
  if (!pokemon) {
    return;
  }
  pokeEquipo.push(pokemon);
  pokeInput.value = "";

  if (pokeEquipo.length >= 3) {
    //desactivar boton
    document.getElementById("save").disabled = true;
    pokeInput.disabled = true;
    equipos.push(pokeEquipo);
    displayCurrentTeam();
  }
  console.log(pokeEquipo);
});

async function getPokemon(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.status === 404) {
      showAlert("Pokemon no encontrado");
      return;
    }
    return response.json();
  } catch (error) {
    showAlert("Error al obtener el pokemon");
  }
}

document.getElementById("teams").addEventListener("click", function () {
  displayTeamHistory();
});

document.getElementById("reset").addEventListener("click", function () {
  pokeEquipo = [];
  document.getElementById("save").disabled = false;
  pokeInput.disabled = false;
  pokeContainerEquipo.innerHTML = "";
});

function displayCurrentTeam() {
  pokeContainerEquipo.innerHTML = "";
  const titulo = document.createElement("h4");
  titulo.textContent = "Equipo actual";
  titulo.classList.add("text-light");
  pokeContainerEquipo.appendChild(titulo);
  pokeEquipo.map((pokemon) => {
    console.log(pokemon);
    const div = document.createElement("div");
    colorFondo = colors[pokemon.types[0].type.name];
    div.style.backgroundColor = colorFondo;
    div.classList.add("card", "col-12", "border-2", "my-2");
    div.innerHTML = `
    <div class="row g-0 position-relative">
      <div class="col-md-3">
        <img src="${pokemon.sprites.front_default}" class="img-fluid rounded-start" alt="${pokemon.name}">
      </div>
      <div class="col-md-6">
        <div class="card-body align-items-center">
          <h5>${pokemon.name}<span>  #${pokemon.id}</span> </h5>
          <div class="card-text">
            Habilidad:
            <div class="card-text">${pokemon.abilities[0].ability.name}</div>
          </div>
          
        </div>
      </div>
      <div class="col-2 align-items-center d-flex">
        <span class="badge rounded-pill bg-danger fs-6 w-100" >
        xp:${pokemon.base_experience}
        </span>
      </div>
    </div>
    `;
    pokeContainerEquipo.appendChild(div);
  });
}

//FUNCION PARA ORDERNAR UN EQUIPO DE POKEMONES POR EXPERIENCIA
function orderTeamByExperience(team) {
  return team.sort((a, b) => a.base_experience - b.base_experience);
}

function displayTeamHistory() {
  pokeContainer.innerHTML = "";
  let equipoID = 0;

  const titulo = document.createElement("h4");
  titulo.textContent = "Historial de equipos";
  titulo.classList.add("text-light","py-3");
  pokeContainer.appendChild(titulo);

  equipos.map((equipo) => {
    equipo = orderTeamByExperience(equipo);
    equipoID++;
    const divRow = document.createElement("div");
    const divcard = document.createElement("div");
    divcard.classList.add("card", "m-2", "shadow", "bg-primary-subtle");
    divRow.classList.add("row", "justify-content-center", "m-2");
    divRow.innerHTML = `
      <h4>Equipo #${equipoID}</h4>`;
    equipo.map((pokemon) => {
      console.log(pokemon);
      const div = document.createElement("div");
      colorFondo = colors[pokemon.types[0].type.name];
      div.style.backgroundColor = colorFondo;
      div.classList.add("card", "col-4", "border-2");
      div.innerHTML = `
      <div class="row g-0 position-relative">
        <div class="col-md-3">
          <img src="${pokemon.sprites.front_default}" class="img-fluid rounded-start" alt="${pokemon.name}">
        </div>
        <div class="col-md-6">
          <div class="card-body align-items-center">
            <h5>${pokemon.name}<span>  #${pokemon.id}</span> </h5>
            <div class="card-text">
              Habilidad:
              <div class="card-text">${pokemon.abilities[0].ability.name}</div>
            </div>
            
          </div>
        </div>
        <div class="col-2 align-items-center d-flex">
          <span class="badge rounded-pill bg-danger fs-6 w-100" >
          xp:${pokemon.base_experience}
          </span>
        </div>
      </div>
      `;

      divRow.appendChild(div);
      divcard.appendChild(divRow);
      pokeContainer.appendChild(divcard);
    });
  });
}

//FUNCION para mostrar una alerta con un texto personalizado
function showAlert(message) {
  const alert = document.createElement("div");
  alert.classList.add(
    "alert",
    `alert-danger`,
    "mt-3",
    "position-absolute",
    "top-50",
    "start-50",
    "translate-middle"
  );
  alert.textContent = message;
  document.getElementById("alert-container").appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 2000);
}
