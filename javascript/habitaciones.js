//BASE DE OBJETOS HABITACION ALMACENADOS EN UN ARRAY.
class Habitacion {
    constructor(idHabitacion, nombreHabitacion, precioPorPersona, capacidad, tipoBanio) {
        this.idHabitacion = idHabitacion;
        this.nombreHabitacion  = nombreHabitacion.toUpperCase();
        this.precioPorPersona = parseFloat(precioPorPersona);
        this.capacidad = capacidad;
        this.tipoBanio = tipoBanio.toUpperCase();
        this.ocupada = false;
    }
    estaOcupada() {
        return this.ocupada;
    }

    marcarOcupada(){
        this.ocupada = true;
    }

    calcularIvaHabitacion(cantidadHuespedes,cantidadDias){
        return (((this.precioPorPersona * cantidadHuespedes) * cantidadDias) * 0.21);
    }

    calcularPrecioHabitacion(cantidadHuespedes,cantidadDias){
        return ((this.precioPorPersona * cantidadHuespedes) * cantidadDias);
    }
}

//Instanciamos objetos habitaciones manualmente y lo cargamos al array de habitaciones.
//Declaramos un array de habitaciones para almacenar objetos
const habitaciones = [];
habitaciones.push(new Habitacion(1, "manga", 130, 2 , "privado"));
habitaciones.push(new Habitacion(2, "abacaxi", 50, 4, "compartido"));
habitaciones.push(new Habitacion(3, "caju", 80, 3, "privado"));
habitaciones.push(new Habitacion(4, "acai", 60, 5, "privado"));
habitaciones.push(new Habitacion(5, "coco", 70, 4, "privado"));
habitaciones.push(new Habitacion(6, "mamao", 130, 2, "privado"));
