//OBJETOS ITEM del carrito - Tiene menos datos(Puede ser habitacion o servicio).
class ItemCarrito {
    constructor(idItem, nombreItem, precioTotalItem, imagenItem) {
        this.idItem = idItem;
        this.nombreItem = nombreItem;
        this.precioTotalItem = parseFloat(precioTotalItem);
        this.imagenItem = imagenItem;
    }
}
