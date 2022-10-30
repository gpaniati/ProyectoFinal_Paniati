const carritoHabitaciones = [];
const carritoServicios = [];

//Tomo control de los campos de busqueda.
let comboFechaIngreso = document.getElementById("inputFechaIngreso");
let comboFechaSalida = document.getElementById("inputFechaSalida");
let comboHuespedes = document.getElementById("inputHuespedes");
let mensajeError = document.getElementById("mensajeError");
let mensajeAviso = document.getElementById("mensajeAviso")
//Inicializo los combos de fechas con la fecha del dia.
comboFechaIngreso.value = (obtenerFechaActual())[0];
comboFechaSalida.value = (obtenerFechaActual())[0];

//Tomo control del boton de consulta y asigno evento.
let botonConsulta = document.getElementById("botonConsulta");
botonConsulta.addEventListener("click", filtrarBusqueda);

//Filtro array de habiataciones segun condiciones de búsqueda.
function filtrarBusqueda() {
    //Limpio carrito habitaciones.
    carritoHabitaciones.splice(0,carritoHabitaciones.length)
    //Limpio errores y avisos.
    mensajeError.innerText = ("");
    mensajeAviso.innerText = ("");
    //Obtengo parámetros de busqueda.
    let fechaIngreso = new Date(comboFechaIngreso.value);
    let fechaSalida = new Date(comboFechaSalida.value);
    let qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    let qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    //Filtro las habitaciones a mostrar de acuerdo a la cantidad de huespedes.
    if (qDiasHospedaje > 0){
        let habitacionesDisponibles = habitaciones.filter((habitacion) => ((habitacion.capacidad >= qHuespedes) && (habitacion.estaOcupada() == false)));
        mostrarHabitaciones(habitacionesDisponibles);
        definirEventos(habitacionesDisponibles);
    }
}

//Muestra la grillas de habitaciones filtradas.
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
                <button id='botonAgregarHabitacion${habitacion.idHabitacion}'
                class="btn btn-primary boton botonAgregarHabitacion">Agregar</a>
            </div>
        `;
        cartaHabitaciones.append(cartaDinamica);
        cartaDinamica.className="cartaDinamica col-lg-2 col-md-3 col-sm-4 col-6";
    }
}

//Funcion para definir eventos de todos los botones de habitaciones a seleccionar.
function definirEventos(habitacionesDisponibles){
    habitacionesDisponibles.forEach((habitacion) => {
        document.getElementById(`botonAgregarHabitacion${habitacion.idHabitacion}`).addEventListener("click",function(){
            agregarACarritoDeHabitaciones(habitacion)
        })
    })
}

//AGREGAR A CARRITOS.
function agregarACarritoDeHabitaciones(habitacion) {
    if (carritoHabitaciones.length == 1){
        mensajeError.innerText = ("Solo se puede seleccionar una habitación...");
    }else{
        carritoHabitaciones.push(habitacion);
        console.table(carritoHabitaciones);
        //Limpio seccion de cartas de habitaciones.
        let cartaHabitaciones = document.getElementById("cardHabitaciones");
        cartaHabitaciones.innerHTML = ``;
        mensajeAviso.innerText = ("Habitación agregada con exito!!!");
    }
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