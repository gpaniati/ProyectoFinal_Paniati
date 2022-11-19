Proyecto Final_Paniati
Proyecto Coder JavaScript - Kuki's Hostel.

El codigo JS esta vinculado en la pagina reservas.html Son 2 archivos JS.
Objetos del tipo HABITACION son todas las habitaciones del hostel y sus atributos. 

1) Se debe ingresar fechas de ingreso y salida de su estadia, cantidad de huespedes, nombre, apellido, mail y telefono del titular de la reserva. Luego presionar consultar. (Tiene validaciones de fechas desde/hasta, datos de entrada del huesped.
El sistema calcula la cantidad de dias de su estancia segun las fechas ingresadas y filtra las habitaciones cuya capacidad sea mayor o igual a la cantidad de huespedes. 
Seleccionar habitacion deseada. (Solo se puede agregar una habitacion).

Objetos del tipo SERVICIOS son todos los servicios ofrecidos por el hostel para contratar. Solo se puede contratar 1 vez cada uno.

2) Se puede seleccionar 1, varios, todos o ninguno para finalizar la reserva. Si selecciona 1 mas de una vez arroja mensaje de error.
Agregar servicios deseados.


**Codigo JS con la logica del simulador.
Para reservar, desde el index.html se debe presionar el boton "Reservar" el cual el cual nos lleva a la seccion reservas.html que contiene el codigo JS.

Cuando simulamos nos pedira cargar datos por pantalla para filtrar (Punto 1).
A medida que se agregan habitacion y servicios se carga la lista con los totales a abonar.
Se puede finalizar la compra cuando se habilita el boton "Finalizar Compra" o se puede limpiar la busqueda sin hacer nada.

Internamente hay un carrito donde le pushea lo seleccionado (HABITACIONES y SERVICIOS). 
La tabla de compr se maneja por DOM al igual que las cards de habitaciones y servicios.

LOCAL-STORAGE:
En el local Storage se guarda las fechas de ingreso, salida y la cantidad de huespedes, nombre, apellido, mail y telefono ingresados por el usuario cuando presiona buscar.
El storage SOLO se limpia cuando finaliza la reserva.
Cada vez que ingresa a la web de reservas revisa si tiene datos en storage y
autocompleta los combos con la busqueda anterior. Si no encuentra nada en el storage, inicializa las fechas con las del dia y en 1 la cantidad de huespedes.

ASINCRONIA.
Con respecto a asincronia se recuperan las habitaciones y servicios disponibles desde dos archivos JSON lo que hace que el proyecto sea escalable sin ningun cambio.
Ademas se consulta a la API de cotizaciones para convertir el precio de los items ofrecidos a pesos.


Muchas gracias.
Saludos.
