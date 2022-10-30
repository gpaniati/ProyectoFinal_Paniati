const carritoHabitaciones = [];
const carritoServicios = [];

//Tomo control de los campos de busqueda.
let comboFechaIngreso = document.getElementById("inputFechaIngreso");
let comboFechaSalida = document.getElementById("inputFechaSalida");
let comboHuespedes = document.getElementById("inputHuespedes");
let mensajeError = document.getElementById("mensajeError")
//Inicializo los combos de fechas con la fecha del dia.
comboFechaIngreso.value = (obtenerFechaActual())[0];
comboFechaSalida.value = (obtenerFechaActual())[0];

//Tomo control del boton de consulta y asigno evento.
let botonConsulta = document.getElementById("botonConsulta");
botonConsulta.addEventListener("click", filtrarBusqueda);


function filtrarBusqueda() {
    let fechaIngreso = new Date(comboFechaIngreso.value);
    let fechaSalida = new Date(comboFechaSalida.value);
    let qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    let qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    //Filtro las habitaciones a mostrar de acuerdo a la cantidad de huespedes.
    if (qDiasHospedaje > 0){
        let habitacionesDisponibles = habitaciones.filter((habitacion) => ((habitacion.capacidad >= qHuespedes) && (habitacion.estaOcupada() == false)));
        mostrarHabitaciones(habitacionesDisponibles);
    }
}

function mostrarHabitaciones(habitacionesDisponibles){
    let cartaHabitaciones = document.getElementById("cardHabitaciones");
    cartaHabitaciones.innerHTML = ``;
    for (const habitacion of habitacionesDisponibles){
        let cartaDinamica = document.createElement("div");
        cartaDinamica.innerHTML = `
            <img src="${habitacion.imagenHabitacion}" class="card-img-top" alt="${habitacion.nombreHabitacion}">
            <div class="card-body">
                <h4 class="card-title">${habitacion.nombreHabitacion}</h4>
                <p class="card-text">Preço por pessoa: R$ ${habitacion.precioPorPersona}</p>
                <a href="#" class="btn btn-primary boton botonAgregar">Agregar</a>
            </div>
        `;
        cartaHabitaciones.append(cartaDinamica);
        cartaDinamica.className="cartaDinamica col-lg-2 col-md-3 col-sm-4 col-6";
    }
}

//AGREGAR A CARRITOS.
function agregarACarritoDeHabitaciones(habitacion) {
    carritoHabitaciones.push(habitacion);
    console.table(carritoHabitaciones);
}

function agregarACarritoDeServicios(servicio) {
    carritoServicios.push(servicio);
    console.table(carritoServicios);
}


//FUNCIONES GENERALES

//Obtengo fecha actual.
function obtenerFechaActual(){
    let fActual = new Date();
    let dia = fActual.getDate();
    let mes = fActual.getMonth() + 1;
    let anio = fActual.getFullYear();
    //Formato AAAA-MM-DD
    let fActualFormato1 = `${anio}-${mes}-${dia}`;
    //Formato DD/MM/AAAA
    let fActualFormato2 = `${dia}/${mes}/${anio}`;
    return [fActualFormato1,fActualFormato2,fActual];
}

//Valida las fechas y calcula la cantidad de días entre ellas.
function calcularDias(fIngreso, fSalida) {
    let fActual = (obtenerFechaActual())[2];
    let dias = 0;
    if (fIngreso < fActual){
        mensajeError.innerText = ("La fecha de entrada debe ser mayor a la fecha de HOY!!!");
    }else {
        if (fIngreso >= fSalida){
            mensajeError.innerText = ("La fecha de salida debe ser mayor a la fecha de entrada!!!");
        }else{
            let difFechas = fSalida.getTime() - fIngreso.getTime();
            dias = Math.round(difFechas / (1000 * 60 * 60 * 24));
            mensajeError.innerText = ("");
        }
    }
    return dias;
}