//Constantes.
//TIPOS DE HABITACION.
//Habitacion Doble con baño privado / PRECIOS.
const DOBLEBPRIV = 1;
const DOBLEBPRIVPRECIO = 130.00;
//Habitacion Doble con baño compartido.
const DOBLEBCOMP = 2;
const DOBLEBCOMPPRECIO = 90.00;
//Habitabion compartida con baño privado.
const COMPARTIDABPRIV = 3;
const COMPARTIDABPRIVPRECIO = 60.00;
//Habitabion compartida con baño compartido.
const COMPARTIDABCOMP = 4;
const COMPARTIDABCOMPPRECIO = 35.00;
//Adicional Aire Acondionado/día.
const ADICAACC = 2.00;

// Bienvendida y solicitud de su nombre
let nombreHuesped1 = (prompt("Bienvenido/a a Kuki's Hotel !!!\nIngrese su nombre")).toUpperCase();
alert("Bienvenido/a "+nombreHuesped1+"!!!");

//Solicitud de huespedes y cantidad de días de hospedaje.
let cantidadDeHuespedes;
let cantidadDeDias;

do{
    cantidadDeHuespedes = prompt("Ingrese la cantidad de huéspedes para alojar (Máximo 2 por operación)");
}while (cantidadDeHuespedes <= 0)
if (cantidadDeHuespedes > 2){
    alert("Debe efectuar la reserva en grupo de máximo 2 huéspedes por operación.\nVuelva a intentar.");
}else{
    //Ingresar la cantidad de dias de la estadía.
    do{
        cantidadDeDias = prompt("Ingrese la cantidad de días que desea hospedarse");
    }while (cantidadDeDias <= 0)

    //Elegir tipo de habitación.
    let habitacionCorrecta = false;
    let tipoDeHabitacion;
    do{
        tipoDeHabitacion = prompt("Ingrese el tipo de habitación deseada:\n1 - HABITACION DOBLE CON BAÑO PRIVADO\n(R$ 130,00 / Persona-Día)\n\n2 - HABITACION DOBLE CON BAÑO COMPARTIDO\n(R$ 90,00 / Persona-Día)\n\n3 - HABITACION COMPARTIDA CON BAÑO PRIVADO\n(R$ 60,00 / Persona-Día)\n\n4 - HABITACION COMPARTIDA CON BAÑO COMPARTIDO\n(R$ 35,00 / Persona-Día)\n\n**NO incluye impuestos");
        if ((tipoDeHabitacion == 1)||(tipoDeHabitacion == 2)||(tipoDeHabitacion == 3)||(tipoDeHabitacion == 4)){
            habitacionCorrecta = true;}
        else{
            alert("Tipo de habitación invalida; vuelva a ingresarla...")
        }
    }while (habitacionCorrecta == false)
        
    //Adicional Aire Acondicionado.
    let aireAcondicionado;
    do{
        aireAcondicionado = (prompt("Desea sumar el costo adicional por uso del Aire Acondicionado? (S/N)\nR$ 2,00/día\n\n**NO incluye impuestos")).toUpperCase();
    }while ((aireAcondicionado != "S")&&(aireAcondicionado != "N"))

    //Tipo de Pago.
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

    //COSTO FINAL
    let costoSinImpuestos = calcularCostoSinImpuestos(tipoDeHabitacion,cantidadDeDias,cantidadDeHuespedes);
    let costoAdicional = 0;
    //Calculo adicional por uso de AACC
    if (aireAcondicionado == "S"){
        costoAdicional = calcularCostoAdicional(cantidadDeDias);
    }
    let costoImpuestos = calcularImpuestos(costoSinImpuestos + costoAdicional);
    let costoFinalSinDescuento = (costoSinImpuestos + costoAdicional + costoImpuestos);
    //Calculo descuento si pago en EFECTIVO
    let descuento = 0;
    if (formaDePago == "EFECTIVO"){
        descuento = calcularDescuento(costoFinalSinDescuento);
    }
    let costoFinalConDescuento = (costoFinalSinDescuento - descuento);

    alert("Resumen de su operación para la estadía en Kuki's Hostel:\n\nCantidad de días = "+cantidadDeDias+"\nCantidad de huéspedes = "+cantidadDeHuespedes+"\nTipo de habitación = "+devolverTipoDeHabitacion(tipoDeHabitacion)+"\nForma de pago = "+formaDePago+"\nCantidad de cuotas = "+cantidadCuotas+" cuotas\nPrecio de hoy = R$ "+costoSinImpuestos+"\nAdicional por uso de AACC = R$ "+costoAdicional+"\nImpuestos y cargos = R$ "+costoImpuestos+"\nDescuento del 10% por pago en EFECTIVO = R$ -"+descuento+"\n\nPrecio Final = R$ "+costoFinalConDescuento);
    
    alert("GRACIAS POR SU COMPRA - DISFRUTE SU ESTADIA");
        
    //FUNCIONES GENERALES.
    //Costo sin impuestos por Tipo de Habitacion / Días / Huepedes.
    function calcularCostoSinImpuestos(tipoDeHabitacion,cantidadDeDias,cantidadDeHuespedes){
        let precioSinImpuestos;
        switch (tipoDeHabitacion){
            //Habitacion Doble con baño privado.
            case '1':
                precioSinImpuestos = ((DOBLEBPRIVPRECIO * cantidadDeDias) * cantidadDeHuespedes);
                break;
            //Habitacion Doble con baño compartido.
            case '2':
                precioSinImpuestos = ((DOBLEBCOMPPRECIO * cantidadDeDias) * cantidadDeHuespedes);
                break;
            //Habitabion compartida con baño privado.
            case '3':
                precioSinImpuestos = ((COMPARTIDABPRIVPRECIO * cantidadDeDias) * cantidadDeHuespedes);
                break;
            //Habitabion compartida con baño compartido.
            case '4':
                precioSinImpuestos = ((COMPARTIDABCOMPPRECIO * cantidadDeDias) * cantidadDeHuespedes);
                break;
            default:
                precioSinImpuestos = 0;
        }
        return precioSinImpuestos;
    }

    //Costo Adicional por uso de AACC.
    function calcularCostoAdicional(cantidadDeDias){
        return (ADICAACC*cantidadDeDias);
    }

    //Calcular costo de impuestos.
    function calcularImpuestos(costoSinImpuestos){
        return (costoSinImpuestos * 0.21);
    }

    //Calcular descuento.
    function calcularDescuento(costoFinalSinDescuento){
        return (costoFinalSinDescuento * 0.10);
    }

    //Descripción tipo de habitación.
    function devolverTipoDeHabitacion(tipoDeHabitacion){
        switch (tipoDeHabitacion){
            case '1':
                return ("Habitación Doble con baño privado");
                break;
            case '2':
                return "Habitación Doble con baño compartido";
                break;
            case '3':
                return "Habitación Compartida con baño privado";
                break;
            case '4':
                return "Habitación Compartida con baño compartido";
                break;
            default:
                return "Sin Habitación"
        }
    }
}
