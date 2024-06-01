//Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");
//Contenedor par los resultados
const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const datoBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  transmision: "",
  color: "",
};

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); // Muestra los autos al cargar
  llenarSelect(); // Llena las opciones de años
});

//Event listener para los select de busqueda
marca.addEventListener("change", (e) => {
  datoBusqueda.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener("change", (e) => {
  datoBusqueda.year = e.target.value;
  filtrarAuto();
});
minimo.addEventListener("change", (e) => {
  datoBusqueda.minimo = e.target.value;
  filtrarAuto();
});
maximo.addEventListener("change", (e) => {
  datoBusqueda.maximo = e.target.value;
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datoBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  datoBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datoBusqueda.color = e.target.value;
  filtrarAuto();
});

//Funciones
function noResultado() {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent =
    " No Hay Resultados, Intenta con otros terminos de busqueda";
  resultado.appendChild(noResultado);
}

function mostrarAutos(autos) {
  limpiarHTML(); //Elimina el HTML previo
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");

    autoHTML.textContent = `
        ${marca}
        ${modelo}
        - ${year}
        - ${puertas} Puertas
        - Transmision: ${transmision}
        - Precio: $${precio}
        - Color: ${color}

    `;
    //Insertamos el resultado en el html
    resultado.appendChild(autoHTML);
  });
}
//Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Genera los años del Select
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //Agrega las opciones de años al select
  }
}

//Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

//Funcion que se encarga de filtar la marca
function filtrarMarca(auto) {
  const { marca } = datoBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}
function filtrarYear(auto) {
  const { year } = datoBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datoBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datoBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}
function filtrarPuertas(auto) {
  const { puertas } = datoBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}
function filtrarTransmision(auto) {
  const { transmision } = datoBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}
function filtrarColor(auto) {
  const { color } = datoBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
