// Clases necesarias Equipo => Liga => AdministradorDeLigas

class Equipo {
  constructor(nombre, puntos) {
    this.nombre = nombre;
    this.puntos = puntos;
  }
}

class Liga {
  constructor(nombre) {
    this.nombre = nombre;
    this.equipos = [];
  }

  agregarEquipo(equipo) {
    // Agregar equipo a la liga correspondiente
    this.equipos.push(equipo);
  }

  buscarEquipo(nombre) {
    // Buscar equipo en la liga correspondiente
    return this.equipos.find(
      (equipo) => equipo.nombre.toLowerCase() === nombre.toLowerCase()
    );
  }

  listarEquipos() {
    // Listar equipos de la liga correspondiente
    return this.equipos;
  }
}

class AdministradorDeLigas {
  constructor() {
    this.ligas = [];
  }

  agregarLiga(liga) {
    // Agregar liga al administrador
    this.ligas.push(liga);
  }

  buscarLiga(nombre) {
    // Buscar liga en el administrador
    return this.ligas.find(
      (liga) => liga.nombre.toLowerCase() === nombre.toLowerCase()
    );
  }

  listarLigas() {
    // Listar ligas del administrador
    return this.ligas;
  }
}

let administradorDeLigas = new AdministradorDeLigas(); // Instancia de AdministradorDeLigas
let opcion1Seleccionada;
const opcionesMenuInicial = ["1. Crear liga", "2. Revisar liga", "3. Salir"];

do {
  if (administradorDeLigas.ligas.length === 0) {
    opcion1Seleccionada = prompt(
      opcionesMenuInicial[0] + "\n" + opcionesMenuInicial[2] // Opciones si no existe liga
    );
  } else {
    opcion1Seleccionada = prompt(opcionesMenuInicial.join("\n")); // Opciones si existe liga
  }

  if (opcion1Seleccionada === "1") {
    const nombreLiga = prompt("Ingrese el nombre de la liga");
    const liga = new Liga(nombreLiga);
    administradorDeLigas.agregarLiga(liga); // Agregamos la liga al administrador
  } else if (opcion1Seleccionada === "2") {
    const listaDeLigas = administradorDeLigas
      .listarLigas()
      .map((liga) => `${liga.nombre}`)
      .join("\n"); // Listamos las ligas
    const nombreLiga = prompt("Seleccione una liga:\n" + listaDeLigas);
    const liga = administradorDeLigas.buscarLiga(nombreLiga); // Buscamos la liga seleccionada
    if (liga) {
      let opcion2Seleccionada;
      const opcionesMenuLiga = [
        "1. Agregar equipo",
        "2. Ver equipos",
        "3. Salir",
      ];

      do {
        opcion2Seleccionada = prompt(opcionesMenuLiga.join("\n"));
        if (opcion2Seleccionada === "1") {
          const nombreEquipo = prompt("Ingrese el nombre del equipo");
          const equipo = new Equipo(nombreEquipo, 0);
          liga.agregarEquipo(equipo); // Agregamos el equipo a la liga correspondiente
        } else if (opcion2Seleccionada === "2") {
          if (liga.equipos.length === 0) {
            alert("No hay equipos registrados");
            continue;
          }
          const equipos = liga.listarEquipos();
          const equiposString = equipos
            .map((equipo) => equipo.nombre)
            .join("\n");
          alert(equiposString); // Listamos los equipos de la liga correspondiente
        }
      } while (opcion2Seleccionada !== "3");
    } else {
      alert("La liga no existe");
    }
  } else if (opcion1Seleccionada === "3") {
    condition = false;
  } else {
    alert("Opción no válida");
  }
} while (true); // Salgo mediante break
