const carritoHabitaciones = [];
const carritoServicios = [];
// Bienvendida y solicitud de su nombre.
let nombreHuesped1 = (prompt("Bienvenido/a a Kuki's Hotel !!!\nIngrese su nombre")).toUpperCase();
alert("Bienvenido/a "+nombreHuesped1+"!!!");

//Solicitud de huespedes y cantidad de días de hospedaje.
let cantidadDeHuespedes;
let cantidadDeDias;

do{
    cantidadDeHuespedes = prompt("Ingrese la cantidad de huéspedes para alojar (Máximo 5 por operacion)");
}while (cantidadDeHuespedes <= 0)
if (cantidadDeHuespedes > 5){
    alert("Debe efectuar la reserva en grupo de máximo 5 huéspedes por operación.\nVuelva a intentar.");
}else{
    //Ingresar la cantidad de dias de la estadía.
    do{
        cantidadDeDias = prompt("Ingrese la cantidad de días que desea hospedarse");
    }while (cantidadDeDias <= 0)

    //ELEGIR HABITACION.
    //Filtro las habitaciones a mostrar de acuerdo a la cantidad de huespedes.
    let habitacionesDisponibles = habitaciones.filter((habitacion) => ((habitacion.capacidad >= cantidadDeHuespedes)&&(habitacion.estaOcupada() == false)));
    
    let mensajeTipoDeHabitacion = "Ingrese el tipo de habitación deseada: \n";
    for (habitacion of habitacionesDisponibles){
        mensajeTipoDeHabitacion += (`${habitacion.idHabitacion} - Habitación: ${habitacion.nombreHabitacion} - Precio por per/día: $R${habitacion.precioPorPersona} - Capacidad: ${habitacion.capacidad} - Baño: ${habitacion.tipoBanio} \n`)    
    }

    //Selecciono la habitacion.
    let habitacionCorrecta = false;
    let tipoDeHabitacion;
    let habitacionEncontrada;
    do{
        tipoDeHabitacion = prompt(mensajeTipoDeHabitacion);
        habitacionEncontrada = habitacionesDisponibles.find((habitacion) => habitacion.idHabitacion == tipoDeHabitacion);
        if (habitacionEncontrada != undefined){
            habitacionCorrecta = true;
            habitaciones[(habitacionEncontrada.idHabitacion)-1].marcarOcupada(); 
        }else{
            alert("Tipo de habitación invalida; vuelva a ingresarla...")
        }
    }while (habitacionCorrecta == false)
    agregarACarritoDeHabitaciones(habitacionEncontrada);


    //ELEGIR SERVICIOS
    let mensajeServicios= "Ingrese el/los servicios que desee contratar: (FIN para salir) \n";
    for (servicio of servicios){
        mensajeServicios += (`${servicio.idServicio} - Servicio: ${servicio.nombreServicio} - Precio por día: $R${servicio.precioPorDia}\n`)    
    }
    //Selecciono servicios.
    let tipoDeServicio;
    let servicioEncontrado;
    let servicioYaElegido = false;
    do{ 
        tipoDeServicio = (prompt(mensajeServicios)).toUpperCase();
        //Busco si existe el id del servicio elegido.
        servicioEncontrado = servicios.find((servicio) => servicio.idServicio == tipoDeServicio);
        //Busco si el servicio ya fue seleccionado en el carrito de servicios.
        servicioYaElegido = carritoServicios.some((servicio) => servicio.idServicio == tipoDeServicio);
        if ((servicioEncontrado != undefined) && (tipoDeServicio != "FIN") && (servicioYaElegido == false)){
            agregarACarritoDeServicios(servicioEncontrado); 
            alert("SERVICIO AÑADIDO CORRECTAMENTE, Continue eligiendo o salga con FIN")
        }else{
            if (tipoDeServicio != "FIN"){
                if (servicioYaElegido == false){
                    alert("Tipo de servicio invalido; vuelva a ingresarlo...");
                }else{
                    alert("Servicio ya elegido; ingrese otro o salga con (FIN)" );
                }
            }
        }
    }while (tipoDeServicio != "FIN")

    function agregarACarritoDeHabitaciones(habitacion) {
        carritoHabitaciones.push(habitacion);
        console.table(carritoHabitaciones);
    }

    function agregarACarritoDeServicios(servicio) {
        carritoServicios.push(servicio);
        console.table(carritoServicios);
    }

    //TIPO DE PAGO.
    let formaDePago;
    let formaDePagoValido;
    do{
        formaDePagoValido = true;
        formaDePago = (prompt("Ingrese la forma de pago - EFECTIVO, DEBITO, TARJETA\n**El pago en efectivo tiene un 10% de descuento")).toUpperCase();
        if ((formaDePago != "EFECTIVO")&&(formaDePago != "DEBITO")&&(formaDePago != "TARJETA")){
            alert("Tipo de pago invalido; vuelva a ingresarlo...");
            formaDePagoValido = false;
        }
    }while (formaDePagoValido == false)

    //Cantidad de cuotas en el caso de pago con TARJETA.
    let cantidadCuotas = 0;
    if (formaDePago == "DEBITO"){
        cantidadCuotas = 1;
    }
    if (formaDePago == "TARJETA"){
        do{
            cantidadCuotas = prompt("Ingrese la cantidad de cuotas a pagar con TARJETA - (Máximo 12 cuotas)")
        }while ((cantidadCuotas <= 0)||(cantidadCuotas > 12))
        
    }

    //COSTO FINAL con comprobante.
    let textoComprobante = "Resumen de su operación para la estadía en Kuki's Hostel:\n\nCantidad de días = "+cantidadDeDias+"\nCantidad de huéspedes = "+cantidadDeHuespedes+"\nForma de pago = "+formaDePago+"\nCantidad de cuotas = "+cantidadCuotas;
    
    //Recorro CARRITO DE HABITACIONES y calculo precios.
    let precioHabitacion = 0;
    let ivaHabitacion = 0;
    textoComprobante += "\n\nHABITACIONES"
    for (let i = 0; i<carritoHabitaciones.length; i++){
        precioHabitacion = carritoHabitaciones[i].calcularPrecioHabitacion(cantidadDeHuespedes,cantidadDeDias);
        ivaHabitacion = carritoHabitaciones[i].calcularIvaHabitacion(cantidadDeHuespedes,cantidadDeDias);
        textoComprobante += `\nHabitacion: ${carritoHabitaciones[i].nombreHabitacion}\nPrecio Habitacion: $R ${precioHabitacion}\nIva Habitación: $R ${ivaHabitacion}\n`;
    }

    //Total acumulado de habitaciones.
    let precioHabitaciones = carritoHabitaciones.reduce((acumulador,habitacion) => acumulador+habitacion.calcularPrecioHabitacion(cantidadDeHuespedes,cantidadDeDias),0);
    let ivaHabitaciones = carritoHabitaciones.reduce((acumulador,habitacion) => acumulador+habitacion.calcularIvaHabitacion(cantidadDeHuespedes,cantidadDeDias),0);
    alert(textoComprobante);
    

    //Recorro CARRITO DE SERVICIO y calculo precios.
    let precioServicio = 0;
    let ivaServicio = 0;
    textoComprobante = "\nSERVICIOS"
    if (carritoServicios.length == 0){
        textoComprobante += "\nSin servicio contratados..."
    }

    for (let i = 0; i<carritoServicios.length; i++){
        precioServicio = carritoServicios[i].calcularPrecioServicio(cantidadDeDias);
        ivaServicio = carritoServicios[i].calcularIvaServicio(cantidadDeDias);
        textoComprobante += `\nServicio: ${carritoServicios[i].nombreServicio}\nPrecio Servicio: $R ${precioServicio}\nIva Servicio: $R ${ivaServicio}\n`;
    }

    //Total acumulado de servicios.
    let precioServicios = carritoServicios.reduce((acumulador,servicio) => acumulador+servicio.calcularPrecioServicio(cantidadDeDias),0);
    let ivaServicios = carritoServicios.reduce((acumulador,servicio) => acumulador+servicio.calcularIvaServicio(cantidadDeDias),0);
    alert(textoComprobante);

    //TOTALES FINALES
    let costoFinalSinDescuento = precioHabitaciones + ivaHabitaciones + precioServicios + ivaServicios;
    //Calculo descuento si pago en EFECTIVO
    let descuento = 0;
    if (formaDePago == "EFECTIVO"){
        descuento = calcularDescuento(costoFinalSinDescuento);
    }
    let costoFinalConDescuento = (costoFinalSinDescuento - descuento);

    textoComprobante = `\nTOTAL\nTotal Habitaciones: $R ${precioHabitaciones}\nTotal IVA Habitaciones: $R ${ivaHabitaciones}\nTotal Servicios: $R ${precioServicios}\nTotal IVA Servicios: $R ${ivaServicios}\nDescuento del 10% por pago en EFECTIVO = R$ ${descuento}\n\nPrecio Final = R$ ${costoFinalConDescuento}`;
    alert(textoComprobante);
    alert("GRACIAS POR SU COMPRA - DISFRUTE SU ESTADIA");
        
    //Calcular descuento.
    function calcularDescuento(costoFinalSinDescuento){
        return (costoFinalSinDescuento * 0.10);
    }
}