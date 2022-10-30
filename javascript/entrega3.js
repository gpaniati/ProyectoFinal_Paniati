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
    carritoHabitaciones.splice(0, carritoHabitaciones.length)
    carritoServicios.splice(0, carritoServicios.length)
    //Limpio errores y avisos.
    mensajeError.innerText = ("");
    mensajeAviso.innerText = ("");
    //Limpio tabla
    let cuerpotabla = document.getElementById("tablaBody");
    cuerpotabla.innerHTML = ``;
    //Obtengo parámetros de busqueda.
    let fechaIngreso = new Date(comboFechaIngreso.value);
    let fechaSalida = new Date(comboFechaSalida.value);
    let qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    let qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    //Filtro las habitaciones a mostrar de acuerdo a la cantidad de huespedes.
    if (qDiasHospedaje > 0) {
        let habitacionesDisponibles = habitaciones.filter((habitacion) => ((habitacion.capacidad >= qHuespedes) && (habitacion.estaOcupada() == false)));
        mostrarHabitaciones(habitacionesDisponibles);
        definirEventosHabitaciones(habitacionesDisponibles);
        mensajeAviso.innerText = ("Selecciones la habitación deseada!!!");
    }
}

//HABITACIONES.
//Muestra la grillas de habitaciones filtradas.
function mostrarHabitaciones(habitacionesDisponibles) {
    let cartaHabitaciones = document.getElementById("cardHabitaciones");
    cartaHabitaciones.innerHTML = ``;
    cardServicios.innerHTML = ``;
    for (const habitacion of habitacionesDisponibles) {
        let cartaDinamica = document.createElement("div");
        cartaDinamica.innerHTML = `
            <img src="${habitacion.imagenHabitacion}" class="card-img-top" alt="${habitacion.nombreHabitacion}">
            <div class="card-body">
                <h4 class="card-title">${habitacion.nombreHabitacion}</h4>
                <p class="card-text">Precio por persona: R$ ${habitacion.precioPorPersona}</p>
                <button id='botonAgregarHabitacion${habitacion.idHabitacion}'
                class="btn btn-primary boton botonAgregar">Agregar</a>
            </div>
        `;
        cartaHabitaciones.append(cartaDinamica);
        cartaDinamica.className = "cartaDinamica col-lg-2 col-md-3 col-sm-4 col-6";
    }
}

//Funcion para definir eventos de todos los botones de habitaciones a seleccionar.
function definirEventosHabitaciones(habitacionesDisponibles) {
    habitacionesDisponibles.forEach((habitacion) => {
        document.getElementById(`botonAgregarHabitacion${habitacion.idHabitacion}`).addEventListener("click", function () {
            agregarACarritoDeHabitaciones(habitacion)
        })
    })
}

//SERVICIOS.
//Muestra la grilla de servicios.
function mostrarServicios(serviciosDisponibles) {
    let cartaServicios = document.getElementById("cardServicios");
    cartaServicios.innerHTML = ``;
    for (const servicio of serviciosDisponibles) {
        let cartaDinamica = document.createElement("div");
        cartaDinamica.innerHTML = `
            <img src="${servicio.imagenServicio}" class="card-img-top" alt="${servicio.nombreServicio}">
            <div class="card-body">
                <h4 class="card-title">${servicio.nombreServicio}</h4>
                <p class="card-text">Precio por dia: R$ ${servicio.precioPorDia}</p>
                <button id='botonAgregarServicio${servicio.idServicio}'
                class="btn btn-primary boton botonAgregar">Agregar</a>
            </div>
        `;
        cartaServicios.append(cartaDinamica);
        cartaDinamica.className = "cartaDinamica col-lg-3 col-md-4 col-sm-6 col-12";
    }
}

//Funcion para definir eventos de todos los botones de servicios a seleccionar.
function definirEventosServicios(serviciosDisponibles) {
    serviciosDisponibles.forEach((servicio) => {
        document.getElementById(`botonAgregarServicio${servicio.idServicio}`).addEventListener("click", function () {
            agregarACarritoDeServicios(servicio)
        })
    })
}
//AGREGAR A CARRITOS.
function agregarACarritoDeHabitaciones(habitacion) {
    if (carritoHabitaciones.length == 1) {
        mensajeError.innerText = ("Solo se puede seleccionar una habitación...");
    } else {
        carritoHabitaciones.push(habitacion);
        agregarHabitacionALaLista(habitacion);
        //console.table(carritoHabitaciones);
        //Limpio seccion de cartas de habitaciones.
        let cartaHabitaciones = document.getElementById("cardHabitaciones");
        cartaHabitaciones.innerHTML = ``;
        alert("Habitación agregada con exito!!!");
        mensajeAviso.innerText = ("Selecciones los servicios deseados!!!");
        mostrarServicios(servicios);
        definirEventosServicios(servicios);
    }
}

function agregarACarritoDeServicios(servicioElegido) {
    let servicioYaElegido = false;
    //Busco si el servicio ya fue seleccionado en el carrito de servicios.
    servicioYaElegido = carritoServicios.some((servicio) => servicio.idServicio == servicioElegido.idServicio);
    if (servicioYaElegido == false) {
        carritoServicios.push(servicioElegido);
        agregarServicioALaLista(servicioElegido);
        //console.table(carritoServicios);
        alert("SERVICIO AÑADIDO CORRECTAMENTE, Continue eligiendo o finalice su reserva...")
        //mensajeAviso.innerText = ("");
        mensajeError.innerText = ("");
    } else {
        mensajeAviso.innerText = ("");
        mensajeError.innerText = ("Servicio ya elegido; seleccione otro o finalice su reserva");
    }
}

//FUNCIONES GENERALES
function agregarHabitacionALaLista(habitacion) {
    let cuerpotabla = document.getElementById("tablaBody");
    let qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    let fechaIngreso = new Date(comboFechaIngreso.value);
    let fechaSalida = new Date(comboFechaSalida.value);
    let qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    let precio = habitacion.calcularPrecioHabitacion(qHuespedes, qDiasHospedaje);
    cuerpotabla.innerHTML += `
        <tr>
            <th class="imagenTabla"><img src="${habitacion.imagenHabitacion}" width=100px height=100px alt="${habitacion.nombreHabitacion}"></th>
            <td>${habitacion.nombreHabitacion} / $R ${habitacion.precioPorPersona}</td>
            <td>${qHuespedes}</td>
            <td>${qDiasHospedaje}</td>
            <td>R$ ${precio}</td>
        </tr>
    `
    calcularTotalCarritos();
}

function agregarServicioALaLista(servicio) {
    let cuerpotabla = document.getElementById("tablaBody");
    let qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    let fechaIngreso = new Date(comboFechaIngreso.value);
    let fechaSalida = new Date(comboFechaSalida.value);
    let qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    let precio = servicio.calcularPrecioServicio(qDiasHospedaje);
    cuerpotabla.innerHTML += `
        <tr>
            <th class="imagenTabla"><img src="${servicio.imagenServicio}" width=100px height=100px alt="${servicio.nombreHabitacion}"></th>
            <td>${servicio.nombreServicio} / $R ${servicio.precioPorDia}</td>
            <td></td>
            <td>${qDiasHospedaje}</td>
            <td>R$ ${precio}</td>
        </tr>
    `
    calcularTotalCarritos();
}

function calcularTotalCarritos(){
    let totalCarritos = 0;
    let qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    let fechaIngreso = new Date(comboFechaIngreso.value);
    let fechaSalida = new Date(comboFechaSalida.value);
    let qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    let totalCarritoHabitaciones = carritoHabitaciones.reduce((acumulador,habitacion) => acumulador + (habitacion.precioPorPersona * qHuespedes * qDiasHospedaje),0);
    let totalCarritoServicios = carritoServicios.reduce((acumulador,servicio) => acumulador + (servicio.precioPorDia * qDiasHospedaje),0);
    totalCarritos = Math.round(totalCarritoHabitaciones + totalCarritoServicios);
    document.getElementById("total").innerText = "Total a pagar:  R$ " + totalCarritos;
}

//Obtengo fecha actual.
function obtenerFechaActual() {
    let fActual = new Date();
    let dia = fActual.getDate();
    let mes = fActual.getMonth() + 1;
    let anio = fActual.getFullYear();
    //Formato AAAA-MM-DD
    let fActualFormato1 = `${anio}-${mes}-${dia}`;
    //Formato DD/MM/AAAA
    let fActualFormato2 = `${dia}/${mes}/${anio}`;
    return [fActualFormato1, fActualFormato2, fActual];
}

//Valida las fechas y calcula la cantidad de días entre ellas.
function calcularDias(fIngreso, fSalida) {
    let fActual = (obtenerFechaActual())[2];
    let dias = 0;
    if (fIngreso < fActual) {
        mensajeError.innerText = ("La fecha de entrada debe ser mayor a la fecha de HOY!!!");
    } else {
        if (fIngreso >= fSalida) {
            mensajeError.innerText = ("La fecha de salida debe ser mayor a la fecha de entrada!!!");
        } else {
            let difFechas = fSalida.getTime() - fIngreso.getTime();
            dias = Math.round(difFechas / (1000 * 60 * 60 * 24));
            mensajeError.innerText = ("");
        }
    }
    return dias;
}