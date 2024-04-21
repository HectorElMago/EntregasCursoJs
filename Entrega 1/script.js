// Variables
let lhd = 0;
let method = 0;
let lhd_quantity = 0;
let condition = true;

// Constantes
const msg_method =
  "Determina el metodo de Explotación:\n1: Block/Panel Caving (Max 15 LHD)\n2: Sub-Level Stoping (Max 5 LHD)\n3: Room&Pilar (Max 5 LHD)\n0: Para salir";

const msg_lhd =
  "Determina el tipo de Equipo LHD a utilizar:\n1: LHD CAT (15 ton)\n2: LHD Komatsu AHS (13 ton)\n0: Para salir";

const msg_lhd_quantity =
  "Determina la cantidad de LHD a utilizar (Numero Entero Positivo):\n0: Para salir";

const msg_continue = "Desea Cambiar de metodo?\n1: Si\n0: No";

// Funciones
const CheckNumber = (number) => {
  if (isNaN(number)) {
    return false;
  } else {
    return true;
  }
};

const GetInput = (prompt_msg, method) => {
  do {
    number = prompt(prompt_msg);

    if (prompt_msg === msg_method) {
      if (number == 0 || number == 1 || number == 2 || number == 3) {
        return number;
      } else {
        number = ".";
      }
    }

    if (prompt_msg === msg_lhd) {
      if (number == 0 || number == 1 || number == 2) {
        return number;
      } else {
        number = ".";
      }
    }

    if (prompt_msg === msg_lhd_quantity) {
      number = parseInt(number);

      if (number == 0) {
        return number;
      } else if (number > 0) {
        if (method == 1 && number <= 15) {
          return number;
        } else if ((method == 2 || method == 3) && number <= 5) {
          return number;
        } else {
          number = "error";
        }
      } else {
        number = ".";
      }
    }

    if (prompt_msg === msg_continue) {
      if (number == 1 || number == 0) {
        return number;
      } else {
        number = ".";
      }
    }

    if (!CheckNumber(number)) {
      if (number === "error") {
        alert("El metodo no soporta esa cantidad de Equipos LHD");
      } else {
        alert("Por favor, ingrese un número válido.");
      }
    }
  } while (CheckNumber);

  return number;
};

const GetResults = (method, lhd, lhd_quantity) => {
  let digit_method = parseInt(method);
  let digit_lhd = parseInt(lhd);

  let results = "El metodo de explotación es:";
  let load_capacity = 0;

  switch (digit_method) {
    case 1:
      results += "Block/Panel Caving";
      break;
    case 2:
      results += "Sub-Level Stoping";
      break;
    case 3:
      results += "Room&Pilar";
      break;
  }

  results += "\nEl tipo de Equipo LHD es:";
  switch (digit_lhd) {
    case 1:
      results += "LHD CAT (15 ton)";
      load_capacity = 15;
      break;
    case 2:
      results += "LHD Komatsu AHS (13 ton)";
      load_capacity = 13;
      break;
  }

  results += "\nLa cantidad de LHD a utilizar es: " + lhd_quantity;

  let total_load = load_capacity * lhd_quantity * 285;

  results += "\nLa capacidad de carga total es: " + total_load + " ton por dia";

  return results;
};

// Main
do {
  let method = GetInput(msg_method);
  if (method == 0) {
    break;
  }

  let lhd = GetInput(msg_lhd);
  if (lhd == 0) {
    1;
    break;
  }

  let lhd_quantity = GetInput(msg_lhd_quantity, method);
  if (lhd_quantity == 0) {
    alert(lhd_quantity);
    break;
  }

  alert(GetResults(method, lhd, lhd_quantity));

  condition = GetInput(msg_continue);

  if (condition == 0) {
    condition = false;
  } else {
    condition = true;
  }
} while (condition);
