const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const limite = 151;
//botones para cargar las distintas generaciones
const gen1Button = document.getElementById("gen1");
const gen2Button = document.getElementById("gen2");
const gen3Button = document.getElementById("gen3");
const gen4Button = document.getElementById("gen4");
const gen5Button = document.getElementById("gen5");
const gen6Button = document.getElementById("gen6");
const gen7Button = document.getElementById("gen7");
const gen8Button = document.getElementById("gen8");
const gen9Button = document.getElementById("gen9");

gen1Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(1, 151); // Cargar Pokémon de la segunda generación
});
 gen2Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(152, 251); // Cargar Pokémon de la segunda generación
}); gen3Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(252, 386); // Cargar Pokémon de la segunda generación
}); gen4Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(387, 493); // Cargar Pokémon de la segunda generación
}); gen5Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(494, 649); // Cargar Pokémon de la segunda generación
}); gen6Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(650, 721); // Cargar Pokémon de la segunda generación
}); gen7Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(722, 809); // Cargar Pokémon de la segunda generación
}); gen8Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(810, 905); // Cargar Pokémon de la segunda generación
}); gen9Button.addEventListener("click", () => {
  listaPokemon.innerHTML = ""; // Limpiar la lista existente
  cargarPokemones(906, 1017); // Cargar Pokémon de la segunda generación
});

async function cargarPokemones(desde=1,hasta=151) {
  const requests = [];

  for (let i = desde; i <= hasta; i++) {
    requests.push(fetch(URL + i).then((response) => response.json()));
  }

  const pokemones = await Promise.all(requests);
  pokemones.forEach((data) => mostrarPokemon(data));
}
function mostrarPokemon(poke) {
  let tipos = poke.types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  tipos = tipos.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <p class="pokemon-id-back">#${poke.id}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}"
            alt="pikachu">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
       ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}kg</p>
        </div>
    </div>
    `;
  listaPokemon.append(div);
}
cargarPokemones();
botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";
    const requests = [];

    for (let i = 1; i <= 1017; i++) {
      requests.push(fetch(URL + i).then((response) => response.json()));
    }

    Promise.all(requests).then((pokemones) => {
      pokemones.forEach((data) => {
        if (botonId === "ver-todos") {
          mostrarPokemon(data);
        } else {
          const tipos = data.types.map((type) => type.type.name);
          if (tipos.some((tipo) => tipo.includes(botonId))) {
            mostrarPokemon(data);
          }
        }
      });
    });
  })
);

