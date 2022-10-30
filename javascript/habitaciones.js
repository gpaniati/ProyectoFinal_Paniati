//BASE DE OBJETOS HABITACION ALMACENADOS EN UN ARRAY.
class Habitacion {
    constructor(idHabitacion, nombreHabitacion, precioPorPersona, capacidad, tipoBanio, imagenHabitacion) {
        this.idHabitacion = idHabitacion;
        this.nombreHabitacion  = nombreHabitacion;
        this.precioPorPersona = parseFloat(precioPorPersona);
        this.capacidad = capacidad;
        this.tipoBanio = tipoBanio.toUpperCase();
        this.ocupada = false;
        this.imagenHabitacion = imagenHabitacion;
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
habitaciones.push(new Habitacion(1, "Quarto Manga", 130, 2 , "privado", "../images/quartos/manga.webp"));
habitaciones.push(new Habitacion(2, "Quarto Abacaxi", 50, 4, "compartido", "../images/quartos/abacaxi.webp"));
habitaciones.push(new Habitacion(3, "Quarto Cajú", 80, 3, "privado", "../images/quartos/caju.webp"));
habitaciones.push(new Habitacion(4, "Quarto Açaí", 60, 5, "privado", "../images/quartos/acai.webp"));
habitaciones.push(new Habitacion(5, "Quarto Coco", 70, 3, "privado", "../images/quartos/coco.webp"));
habitaciones.push(new Habitacion(6, "Quarto Mamão", 130, 2, "privado", "../images/quartos/mamao.webp"));
