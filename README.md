PreEntregae_Paniati
Proyecto Coder JavaScript - Kuki's Hostel.

El codigo JS esta vinculado en la pagina reservas.html Son 3 archivos JS.
Objetos del tipo HABITACION son todas las habiataciones del hostel y sus atributos. 

1) Se debe ingresar fechas de ingreso y salida de su estadia mas la cantidad de huespedes. Luego presionar consultar. (Tiene validaciones desde hasta: "mensaje rojo h3 por pantalla)
El sistema calcula la cantidad de dias de su estancia segun las fechas ingresadas y filtra las habitaciones cuya capacidad sea mayor o igual a la cantidad de huespedes. (Por el momento al momento NO divide a los huespedes en distintas habitaciones)
Agregar habitacion deseada. (Solo se puede agregar una habitacion).

Objetos del tipo SERVICIOS son todos los servicios ofrecidos por el hostel para contratar. Solo se puede contratar 1 vez cada uno.
2) Se puede selecciona 1, varios, todos o ninguno para finalizar la reserva. Si selecciona 1 mas de una vez arroja "mensaje rojo" h3 por pantalla.
Agregar servicios deseados.


**Codigo JS con la logica del simulador.
Para reservar, desde el index.html se debe presionar el boton "Ver cuartos y servicios" el cual lleva a la seccion acomodacao.html. Es esta seccion se pueden ver los cuarots con sus caracteristicas. Desde ahi presionar el boton "Simular una reserva" el cual nos lleva a la seccion reservas.html que contiene el codigo JS.

Cuando simulamos nos pedira cargar datos por pantalla para filtrar (Punto 1).
A medida que se agregan habitacion y servicios se carga la lista con los totales a abonar.
Se puede finalizar la compra cuando se habilita el boton "Finalizar Compra" o se puede limpiar la busqueda sin hacer nada.

Internamente hay dos carritos (HABITACIONES y SERVICIOS) a los que se les pushea lo seleccionado. (Recuerda que en esta version solo se puede seleccionar una habitacion). 
La tabla de seleccion se maneja por DOM al igual que las cards de habiataciones y servicios.

LOCAL-STORAGE:
En el local Storage se guarda las fechas de ingreso, salida y la cantidad de huespedes ingresados por el usuario cuando presiona buscar.
El storage SOLO se limpia cuando finaliza la reserva.
Cada vez que ingresa a la web de reservas revisa si tiene datos en storage y
autocompleta los combos con la busqueda anterior. Si no encuentra nada en el storage, inicializa las fechas con las del dia y en 1 la cantidad de huespedes.

PD. Se utilizaron dos alerts para indicar la correcta seleccion de la habitacion y cada servicio. (Autorizado por la profesora hasta ver librerias nuevas)

Cualquier duda me escriben.
Saludos.
