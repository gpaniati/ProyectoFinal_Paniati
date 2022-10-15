//BASE DE SERVICIOS ALMACENADOS EN UN ARRAY.
class Servicio {
    constructor(idServicio, nombreServicio, precioPorDia) {
        this.idServicio = idServicio;
        this.nombreServicio  = nombreServicio.toUpperCase();
        this.precioPorDia = parseFloat(precioPorDia);
    }
 }

//Instanciamos objetos servicios manualmente y lo cargamos al array de servicios.
//Declaramos un array de servicios para almacenar objetos
const servicios = [];
servicios.push(new Servicio(1, "aire acondicionado", 2));
servicios.push(new Servicio(2, "desayuno", 10));
servicios.push(new Servicio(3, "toalla pileta", 3));
servicios.push(new Servicio(4, "locker", 5));

