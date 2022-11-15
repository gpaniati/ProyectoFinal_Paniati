//Arrays de Carritos.
const carritoHabitaciones = [];
const carritoServicios = [];
//
//JSON Habitaciones y productos.
let habitacionesJson = [];
let productosJson = [];
//
//Objeto Datos de Busqueda.
let datosBusquedaJson;
let datosBusquedaObjeto;
let jsonDatosBusqueda;
//
//Variables globales.
let fechaIngreso;
let fechaSalida;
let qHuespedes; 
let qDiasHospedaje; 
let cotizacionCompra;
//
//Tomo control de los campos de busqueda.
let comboFechaIngreso = document.getElementById("inputFechaIngreso");
let comboFechaSalida = document.getElementById("inputFechaSalida");
let comboHuespedes = document.getElementById("inputHuespedes");
//
//STORAGE.
/*Busco en Storage si hay datos de busqueda antariores. Si hay, los seteo en los combos para que el usuario
vuelva a poder consultar lo que se quedo. No guardo los carritos por si se agregaron habitaciones, etc*/
datosBusquedaJson = localStorage.getItem("miBusqueda");
datosBusquedaObjeto = JSON.parse(datosBusquedaJson);
if (datosBusquedaJson != null){
    comboFechaIngreso.value = datosBusquedaObjeto.fechaIngreso;
    comboFechaSalida.value = datosBusquedaObjeto.fechaSalida;
    comboHuespedes.value = datosBusquedaObjeto.qHuespedes;
}else{
    //Inicializo los combos de fechas con la fecha del dia.
    comboFechaIngreso.value = (obtenerFechaActual())[0];
    comboFechaSalida.value = (obtenerFechaActual())[0];
}
//
//Tomo cotizacion del Dolar. 
//Anido a esta funcion la consulta a los JSON de habitaciones y servicios.
obtenerCotizacion();
//
//ASIGNAR EVENTOS.
//Tomo control del boton de consulta y asigno evento.
let botonConsulta = document.getElementById("botonConsulta");
botonConsulta.addEventListener("click", filtrarBusqueda);
//Tomo control del boton de "finalizar compra", asigno evento y lo desabilito.
let botonFinalizar = document.getElementById("botonFinalizar");
botonFinalizar.addEventListener("click", finalizarReserva);
botonFinalizar.disabled = true;
//Tomo control del boton de limpiar y asigno evento.
let botonLimpiar = document.getElementById("botonLimpiar");
botonLimpiar.addEventListener("click", limpiarReserva);
//
//FUNCIONES DEL SIMULADOR.
//Filtro array de habitaciones segun condiciones de búsqueda.
function filtrarBusqueda() {
    botonFinalizar.disabled = true;
    //Limpio carrito habitaciones.
    carritoHabitaciones.splice(0, carritoHabitaciones.length)
    carritoServicios.splice(0, carritoServicios.length)
    //Limpio tabla.
    let cuerpotabla = document.getElementById("tablaBody");
    cuerpotabla.innerHTML = ``;
    //Obtengo parámetros de busqueda. EL "+"T00:00:00" es para que devuelva bien la fecha por el huso horario, sino a veces te devuelve el dia anterior.
    fechaIngreso = new Date(comboFechaIngreso.value+"T00:00:00");
    fechaSalida = new Date(comboFechaSalida.value+"T00:00:00");
    qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    //Filtro las habitaciones a mostrar de acuerdo a la cantidad de huespedes.
    if (qDiasHospedaje > 0) {
        //Cargo Objeto de Datos de busqueda en Local Storage.
        datosBusquedaObjeto = new DatosBusqueda(convertirFecha(fechaIngreso), convertirFecha(fechaSalida), qHuespedes, qDiasHospedaje);
        jsonDatosBusqueda = JSON.stringify(datosBusquedaObjeto);
        localStorage.setItem("miBusqueda", jsonDatosBusqueda);
        //Filtro Habitaciones.
        let habitacionesDisponibles = habitacionesJson.filter(habitacion => habitacion.capacidad >= qHuespedes);
        //Renderizo array de habitaciones disponibles.
        mostrarHabitaciones(habitacionesDisponibles);
        definirEventosHabitaciones(habitacionesDisponibles);
        //mensajeAviso.innerText = ("Selecciones la habitación deseada!!!");
    }
}
//
//HABITACIONES.
//Muestra la grilla de habitaciones filtradas en forma de cartas Boostrap. Se hace responsive.
function mostrarHabitaciones(habitacionesDisponibles) {
    let cartaHabitaciones = document.getElementById("cardHabitaciones");
    cartaHabitaciones.innerHTML = ``;
    let cartaServicios = document.getElementById("cardServicios");
    cartaServicios.innerHTML = ``;
    for (const habitacion of habitacionesDisponibles) {
        let cartaDinamica = document.createElement("div");
        cartaDinamica.innerHTML = `
            <img src="${habitacion.imagenHabitacion}" class="card-img-top" alt="${habitacion.nombreHabitacion}">
            <div class="card-body">
                <h4 class="card-title">${habitacion.nombreHabitacion}</h4>
                <p class="card-text">Precio por persona: U$D $ ${habitacion.precioPorPersona}</p>
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
//
//SERVICIOS.
//Muestra la grilla de servicios en forma de cartas Boostrap. Se hace responsive.
function mostrarServicios(serviciosDisponibles) {
    let cartaServicios = document.getElementById("cardServicios");
    cartaServicios.innerHTML = ``;
    for (const servicio of serviciosDisponibles) {
        let cartaDinamica = document.createElement("div");
        cartaDinamica.innerHTML = `
            <img src="${servicio.imagenServicio}" class="card-img-top" alt="${servicio.nombreServicio}">
            <div class="card-body">
                <h4 class="card-title">${servicio.nombreServicio}</h4>
                <p class="card-text">Precio por dia: U$D $ ${servicio.precioPorDia}</p>
                <button id='botonAgregarServicio${servicio.idServicio}'
                class="btn btn-primary boton botonAgregar">Agregar</a>
            </div>
        `;
        cartaServicios.append(cartaDinamica);
        cartaDinamica.className = "cartaDinamica col-lg-3 col-md-3 col-sm-4 col-6";
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
//
//FUNCIONES CARRITOS.
//AGREGAR A CARRITOS.
function agregarACarritoDeHabitaciones(habitacion) {
    if (carritoHabitaciones.length == 1) {
        Swal.fire({
            icon: 'error',
            text: 'Solo se puede seleccionar una habitación...',
        })
    } else {
        carritoHabitaciones.push(habitacion);
        agregarHabitacionALaLista(habitacion);
        //Limpio seccion de cartas de habitaciones.
        document.getElementById("cardHabitaciones").innerHTML = ``;
        Swal.fire({
            title: habitacion.nombreHabitacion,
            text: 'Habitación seleccionada con exito!!!',
            imageUrl: habitacion.imagenHabitacion,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: habitacion.nombreHabitacion,
            showConfirmButton: false,
            timer: 1500
        });
        mostrarServicios(servicios);
        definirEventosServicios(servicios);
        botonFinalizar.disabled = false;
    }
}

function agregarACarritoDeServicios(servicioElegido) {
    let servicioYaElegido = false;
    //Busco si el servicio ya fue seleccionado en el carrito de servicios.
    servicioYaElegido = carritoServicios.some((servicio) => servicio.idServicio == servicioElegido.idServicio);
    if (servicioYaElegido == false) {
        carritoServicios.push(servicioElegido);
        agregarServicioALaLista(servicioElegido);
        alert("SERVICIO AÑADIDO CORRECTAMENTE, Continue eligiendo o finalice su reserva...")
        mensajeError.innerText = ("");
    } else {
        mensajeAviso.innerText = ("");
        mensajeError.innerText = ("Servicio ya elegido; seleccione otro o finalice su reserva");
    }
}

function agregarHabitacionALaLista(habitacion) {
    let cuerpotabla = document.getElementById("tablaBody");
    qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    fechaIngreso = new Date(comboFechaIngreso.value+"T00:00:00");
    fechaSalida = new Date(comboFechaSalida.value+"T00:00:00");
    qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    let precio = habitacion.precioPorPersona * qHuespedes * qDiasHospedaje;
    cuerpotabla.innerHTML += `
        <tr>
            <th class="imagenTabla"><img src="${habitacion.imagenHabitacion}" width=80px height=80px alt="${habitacion.nombreHabitacion}"></th>
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
    fechaIngreso = new Date(comboFechaIngreso.value+"T00:00:00");
    fechaSalida = new Date(comboFechaSalida.value+"T00:00:00");
    qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    let precio = servicio.calcularPrecioServicio(qDiasHospedaje);
    cuerpotabla.innerHTML += `
        <tr>
            <th class="imagenTabla"><img src="${servicio.imagenServicio}" width=80px height=80px alt="${servicio.nombreHabitacion}"></th>
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
    qHuespedes = comboHuespedes.options[comboHuespedes.selectedIndex].value;
    fechaIngreso = new Date(comboFechaIngreso.value+"T00:00:00");
    fechaSalida = new Date(comboFechaSalida.value+"T00:00:00");
    qDiasHospedaje = calcularDias(fechaIngreso, fechaSalida);
    let totalCarritoHabitaciones = carritoHabitaciones.reduce((acumulador,habitacion) => acumulador + (habitacion.precioPorPersona * qHuespedes * qDiasHospedaje),0);
    let totalCarritoServicios = carritoServicios.reduce((acumulador,servicio) => acumulador + (servicio.precioPorDia * qDiasHospedaje),0);
    totalCarritos = Math.round(totalCarritoHabitaciones + totalCarritoServicios);
    document.getElementById("total").innerText = "Total a pagar:  R$ " + totalCarritos;
}

function finalizarReserva(){
    alert("RESERVA CONFIRMADA CORRECTAMENTE!!! , Disfrute su estadía")
    //Limpio carrito habitaciones.
    carritoHabitaciones.splice(0, carritoHabitaciones.length)
    carritoServicios.splice(0, carritoServicios.length)
    //Limpio tabla, seccion de habitaciones y servicios.
    document.getElementById("tablaBody").innerHTML = ``;
    document.getElementById("cardHabitaciones").innerHTML = ``;
    document.getElementById("cardServicios").innerHTML = ``;
    //Deshabitito boton de "Finalizar Compra".
    botonFinalizar.disabled = true;
    //Limpio el Storage solo cuando finaliza la reserva.
    localStorage.clear();
}

function limpiarReserva(){
    //Limpio carrito habitaciones.
    carritoHabitaciones.splice(0, carritoHabitaciones.length)
    carritoServicios.splice(0, carritoServicios.length)
    //Limpio tabla.
    let cuerpotabla = document.getElementById("tablaBody");
    cuerpotabla.innerHTML = ``;
    let cartaHabitaciones = document.getElementById("cardHabitaciones");
    cartaHabitaciones.innerHTML = ``;
    let cartaServicios = document.getElementById("cardServicios");
    cartaServicios.innerHTML = ``;
    botonFinalizar.disabled = true;
}

//FUNCIONES GENERALES
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

//Convertir fecha.
function convertirFecha(fecha) {
    let dia = fecha.getDate();
    if (dia < "10"){
        dia = ("0" + fecha.getDate());
    }
    let mes = fecha.getMonth() + 1;
    if (mes < "10"){
        mes = ("0" + (fecha.getMonth() + 1));
    }
    let anio = fecha.getFullYear();
    //Formato AAAA-MM-DD
    let fechaFormateada = `${anio}-${mes}-${dia}`;
    return (fechaFormateada);
}

//Valida las fechas y calcula la cantidad de días entre ellas.
function calcularDias(fIngreso, fSalida) {
    let fActual = (obtenerFechaActual())[2];
    let dias = 0;
    if (fIngreso < fActual) {
        Swal.fire({
            icon: 'error',
            text: 'La fecha de entrada debe ser mayor a la fecha de HOY!!!!',
        })
    } else {
        if (fIngreso >= fSalida) {
            Swal.fire({
                icon: 'error',
                text: 'La fecha de salida debe ser mayor a la fecha de entrada!!!',
            })
        } else {
            let difFechas = fSalida.getTime() - fIngreso.getTime();
            dias = Math.round(difFechas / (1000 * 60 * 60 * 24));
        }
    }
    return dias;
}

//USO DE STORAGE Y JSON.
//Guardo los campos de busqueda que realizo el cliente la ultima vez antes de finalizar compra.
class DatosBusqueda{
    constructor(fechaIngreso, fechaSalida, qHuespedes, qDiasHospedaje) {
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.qHuespedes = qHuespedes;
        this.qDiasHospedaje = qDiasHospedaje;
    }
}
//
//APIS
//Obtengo cotizacion
function obtenerCotizacion(){
    const urlCotizacion = "https://api.bluelytics.com.ar/v2/latest";
    fetch(urlCotizacion)
        .then(respuesta => respuesta.json())
        .then(datos => {
            const dolar = datos.blue;
            console.log(dolar);
            cotizacionCompra = dolar.value_buy;
            obtenerDatosJson();
        })
        //Catch del fetch cotizacion.
        .catch(error => console.log("Error al obtener cotización"))
}

//Obtengo habitaciones y servicios de sus correspondientes JSON.
function obtenerDatosJson(){
    const urlHabitaciones = "../json/habitaciones.json";
    fetch(urlHabitaciones)
        .then (respuestaHabitaciones => respuestaHabitaciones.json())
        .then (datosRecibidos => {
            habitacionesJson = datosRecibidos.habitaciones;
            console.log(habitacionesJson);
            obtenerServicios();
        })
    //Catch del fetch habitaciones.
    .catch(error => console.log("Error al obtener habitaciones"))
}

function obtenerServicios(){
    const urlServicios = "../json/servicios.json";
    fetch(urlServicios)
        .then (respuestaServicios => respuestaServicios.json())
        .then (datosRecibidos => {
            serviciosJson = datosRecibidos.servicios;
            console.log(serviciosJson);
        })
    //Catch del fetch servicios.
    .catch(error => console.log("Error al obtener servicios"))
}