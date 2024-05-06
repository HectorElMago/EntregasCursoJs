// Obtener los datos de localStorage
let leagues = JSON.parse(localStorage.getItem("leagues")) || [
  {
    nameLeague: "Liga Chilena",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfr8g06ROkgKBlr1M3vBIMfm8gfn4t1B5TtVU0RdGdcw&s",
    teams: [
      "Colo Colo",
      "Universidad de Chile",
      "Universidad Católica",
      "Palestino",
      "Audax Italiano",
    ],
  },
  {
    nameLeague: "Liga Argentina",
    url: "https://media.licdn.com/dms/image/C560BAQHqpU0ZwUWWXQ/company-logo_200_200/0/1630658286646/superliga_logo?e=2147483647&v=beta&t=QBj9dW_vili5-nH-_XnYMsandOLKWK1Ze355USoRZHY",
    teams: [
      "River Plate",
      "Boca Juniors",
      "Independiente",
      "Racing Club",
      "San Lorenzo",
    ],
  },
  {
    nameLeague: "Liga Brasileña",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQI_LUwWmMr4rSSWQpR-RRGKKQyLFZ2gJmWqoUsNyzGQ&s",
    teams: ["Flamengo", "Sao Paulo", "Palmeiras", "Corinthians", "Santos"],
  },
];

// Actualizar el arreglo en localStorage cuando cambie
function updateLocalStorage() {
  localStorage.setItem("leagues", JSON.stringify(leagues));
}

// Obtener elementos del DOM, estos estaran siempre presentes
let containerLeagues = document.getElementById("containerLeagues");
let selectLeagues = document.getElementById("selectLeague");
let filterLeagues = document.getElementById("filterLeagues");
let nameLeagueAdd = document.getElementById("leagueName");
let urlLeagueAdd = document.getElementById("leagueLogo");
let nameTeamAdd = document.getElementById("teamName");
let buttonAddTeam = document.getElementById("addTeam");
let buttonAddLeague = document.getElementById("addLeague");
let buttonCleanStorage = document.getElementById("cleanStorage");

function generateArticles(filter = "") {
  // Limpiamos el contenedor de ligas antes de generar los artículos
  containerLeagues.innerHTML = "";

  // Filtramos las ligas según el filtro seleccionado
  let filteredLeagues = leagues.filter((league) =>
    league.nameLeague.toLowerCase().includes(filter.toLowerCase())
  );

  // Generamos los artículos para cada liga filtrada
  filteredLeagues.forEach((league) => {
    let article = document.createElement("article");
    article.classList.add("liga");
    article.innerHTML = `
      <h2>${league.nameLeague}</h2>
      <img src="${league.url}" alt="logo-liga-chilena" />
      <div class="equipos">
        <h3>Equipos</h3>
        <ul>
          ${league.teams.map((team) => `<li>${team}</li>`).join("")}
        </ul>
      </div>
    `;
    containerLeagues.appendChild(article);
  });
}

// Para que funcione en la primera carga
generateArticles();

// Escuchamos el evento change del filtro para actualizar los artículos según el filtro seleccionado
filterLeagues.addEventListener("input", function () {
  generateArticles(this.value); // This Value es el filtro que se esta ingresando
});

// Actualizar el select con los equipos disponibles, para luego poder añadir un equipo a esa liga
leagues.forEach((league) => {
  let option = document.createElement("option");
  option.value = league.nameLeague;
  option.textContent = league.nameLeague;
  selectLeagues.appendChild(option);
});

// Escuchamos el evento change del select para filtrar las ligas
selectLeagues.addEventListener("change", filterLeague);

function filterLeague() {
  let leagueSelectedName = selectLeagues.value;

  // Si no hay ninguna liga seleccionada en el filtro, mostrar todas las ligas
  if (leagueSelectedName === "") {
    leagues.forEach((league) => {
      document.querySelector(
        `article.liga h2:contains(${league.nameLeague})`
      ).parentNode.style.display = "block";
    });
  } else {
    // Mostrar solo la liga seleccionada
    leagues.forEach((league) => {
      let article = document.querySelector(
        `article.liga h2:contains(${league.nameLeague})`
      ).parentNode;
      if (league.nameLeague === leagueSelectedName) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  }
}

// Escuchamos el evento click del boton añadir equipo
buttonAddTeam.addEventListener("click", addTeam);

function addTeam() {
  // Validamos que el nombre del equipo no venga vacio
  if (!nameTeamAdd.value) {
    alert("Debes ingresar un nombre de equipo");
    return;
  }
  // Identificamos la liga seleccionada en el input select
  let leagueSelected = leagues.find(
    (league) => league.nameLeague === selectLeagues.value
  );

  // A esa liga le hacemos un push de lo que aparezca en el input de añadir equipo
  leagueSelected.teams.push(nameTeamAdd.value);

  // Buscamos la liga en el DOM https://stackoverflow.com/questions/7459704/in-javascript-what-is-the-best-way-to-convert-a-nodelist-to-an-array
  let leagueDOM = Array.from(document.querySelectorAll("article.liga h2")).find(
    (h2) => h2.textContent === leagueSelected.nameLeague
  ).parentNode;

  // Actualizamos la lista de equipos
  leagueDOM.querySelector("ul").innerHTML = leagueSelected.teams
    .map((team) => `<li>${team}</li>`)
    .join("");

  // Limpiamos el campo
  nameTeamAdd.value = "";

  // Actualizamos el localStorage
  updateLocalStorage();
}

// Escuchamos el evento click del boton añadir Liga
buttonAddLeague.addEventListener("click", addLeague);

function addLeague() {
  // Validamos que los campos no vengan vacios
  if (!nameLeagueAdd.value || !urlLeagueAdd.value) {
    alert("Debes ingresar un nombre y una url de la liga");
    return;
  }

  // Creamos el objeto correspondiente sin  equipos
  let league = {
    nameLeague: nameLeagueAdd.value,
    url: urlLeagueAdd.value,
    teams: [],
  };

  // Limpiamos los campos
  nameLeagueAdd.value = "";
  urlLeagueAdd.value = "";

  // Lo añadimos al array de objetos
  leagues.push(league);

  // Añadimos la opcion al select
  let option = document.createElement("option");
  option.value = league.nameLeague;
  option.textContent = league.nameLeague;
  selectLeagues.appendChild(option);

  // Creamos su seccion correspondiente al igual que antes
  let article = document.createElement("article");
  article.classList.add("liga");
  article.innerHTML = `
    <h2>${league.nameLeague}</h2>
    <img src="${league.url}" alt="logo-liga-chilena" />
    <div class="equipos">
      <h3>Equipos</h3>
      <ul>
        ${league.teams.map((team) => `<li>${team}</li>`).join("")}
      </ul>
    </div>
  `;
  containerLeagues.appendChild(article);

  // Actualizamos el localStorage
  updateLocalStorage();
}

// Escuchamos el evento click del boton limpiar localStorage
buttonCleanStorage.addEventListener("click", cleanStorage);

// Limpiar el localStorage
function cleanStorage() {
  localStorage.removeItem("leagues");
  leagues = [];
  generateArticles();
}

// Ejemplo de formato liga
`
<article class="liga">
          <h2>Liga 1</h2>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfr8g06ROkgKBlr1M3vBIMfm8gfn4t1B5TtVU0RdGdcw&s"
            alt="logo-liga-chilena"
          />
          <div class="equipos">
            <h3>Equipos</h3>
            <ul>
              <li>Equipo 1</li>
              <li>Equipo 2</li>
              <li>Equipo 3</li>
              <li>Equipo 4</li>
              <li>Equipo 5</li>
            </ul>
          </div>
        </article>
`;
