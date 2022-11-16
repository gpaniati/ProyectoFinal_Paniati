//OBJETOS SERVICIO DEL CARRITO - Tiene menos datos.
class ServicioCarrito {
    constructor(idServicio, nombreServicio, precioTotal, imagenServicio) {
        this.idServicio = idServicio;
        this.nombreServicio  = nombreServicio;
        this.precioTotal = parseFloat(precioTotal);
        this.imagenServicio = imagenServicio;
    }
}

