const carritoHabitaciones = [];
const carritoServicios = [];

//Tomo control de los campos de busqueda.
let fechaEntrada = document.getElementById("inputFechaEntrada");
let fechaSalida = document.getElementById("inputFechaSalida");
let comboHuespedes = document.getElementById("inputHuespedes");

//Tomo control del boton de consulta y asigno evento.
let botonConsulta = document.getElementById("botonConsulta");
botonConsulta.addEventListener("click", filtrarBusqueda);

function filtrarBusqueda(){
    console.log("Idiota");
    console.log(fechaEntrada.value);
    //console.log(fechaSalida.text);
    let qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    console.log(qHuespedes);
}
