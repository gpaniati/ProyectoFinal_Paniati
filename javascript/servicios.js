//BASE DE OBJETOS SERVICIO ALMACENADOS EN UN ARRAY.
class Servicio {
    constructor(idServicio, nombreServicio, precioPorDia, imagenServicio) {
        this.idServicio = idServicio;
        this.nombreServicio  = nombreServicio;
        this.precioPorDia = parseFloat(precioPorDia);
        this.imagenServicio = imagenServicio;
    }

    calcularIvaServicio(cantidadDias){
        return ((this.precioPorDia * cantidadDias) * 0.21);
    }

    calcularPrecioServicio(cantidadDias){
        return (this.precioPorDia * cantidadDias);
    }
}

//Instanciamos objetos servicios manualmente y lo cargamos al array de servicios.
//Declaramos un array de servicios para almacenar objetos
const servicios = [];
servicios.push(new Servicio(1, "Aire acondicionado", 2, "../images/servicios/aireAcondicionado.webp"));
servicios.push(new Servicio(2, "Desayuno", 10, "../images/servicios/desayuno.webp"));
servicios.push(new Servicio(3, "Toalla pileta", 3, "../images/servicios/toallas.webp"));
servicios.push(new Servicio(4, "Locker", 5, "../images/servicios/lockers.webp"));

