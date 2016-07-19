//VARIABLES GLOBALES//
//------------------//

//Contadores para el for loop
var i, j;

//creamos el array con la longitud 10, es decir [0,1,2...,8,9];
var matrizPlaneta = new Array(10);

//con este for iremos creando las filas (un array y dentro de cada [i] creamos otro array que seran columnas)
for (i = 9; i>=0; i--)
{
	//y con esta linea creamos las columnas en de nuestra matriz. De cada array[i] de nuestro array principal sale otro array de 0 a 9 cada uno.
	//por lo tanto creamos lo que se llama una matriz.
	matrizPlaneta[i] = new Array(10);

	for (j = 9; j>=0; j--)
	{
		//aqui lo que hacemos es igualar cada posicion del array, desde la 0,0 hasya la 9,9 a unas lineas que simulan graficamente una tabla una vez las pintemos
		matrizPlaneta[i][j] = "||[" + i + "][" + j + "]||";
	}
}

//Esta es nuestra nave graficamente, una R
var rover = "!¡--R--¡!";

//////////////////////////////////////////////////////
//var rover = document.createElement("img");		// Con esto queria conseguir que la imagen de la flecha
//rover.className="direccion";						// fuera la propia nave pero no me coge la imagen
//rover.setAttribute("src", "flechas/arriba.jpg");	// y he desistido.
//////////////////////////////////////////////////////

//0 = norte; 1 = este; 2 = sur; 3 = oeste
//0 = arriba; 1 = derecha; 2 = abajo; 3 = izquierda
var sentido = 0;

//colocamos nuestra nave al "principio" de nuestro planeta aunque como es redondo la podemos poner en la posición que queramos.
matrizPlaneta[0][0] = rover;

//funcion con la que pintaremos la tabla que hemos creado igualando cada posición a ciertas lineas en el for de crear la matriz
//Esta funcion no solo pinta la tabla, pinta lo que vale la variable rover, las flechas y los botones
function pintar(){
	//Cada vez que pinto la tabla nuevamente, borro la anterior para no tener varias veces la misma tabla con el rover en diferentes posiciones
	document.body.innerHTML = "";
	//entro en la fila desde la ultima posicion a la primera
	for (i = 9; i>=0; i--){
		//Elemento decorativo en la parte de arriba
		document.write("_______________________________________________________________");
		//Salto de linea para que no este todo junto
		document.write("<br/>"); 
		//en cada posicion de la fila, entro en su respectiva columna, la recorro entera pintando su contenido
		//y salgo del for, entro a la siguiente posición de la fila y a la siguiente columna.
		for (j = 0; j<=9; j++){
			document.write(matrizPlaneta[i][j]);
		}
		//Salto de linea
		document.write("<br/>"); 
	}
	//Para borrar la tabla, como no es un <table>, si no texto, borro todo el contenido del body y pinto todos los botones e imagenes de direccion y etc...
	//Se que no es lo más eficiente pero no he conseguido hacerlo mejor.
	document.write('<div class="div1"><table><tr><td colspan="3" align="center"><input type="button" value="Adelante" onclick="avanzar();"></input></td></tr><tr><td><input type="button" value="Izquierda" onclick="girarIzq();"></td><td><input type="button" value="Abajo" onclick="retroceso();"></td><td><input type="button" value="Derecha" onclick="girarDer();"></td></tr><tr><td colspan="3" align="center"></td></tr></table></br></div>');
	//Cuaando rover esta mirando hacia el norte, sur, este u oeste ponemos una u otra imagen de dirección.
	if (sentido == 0){
		document.write('<img class ="direccion" src="flechas/arriba.jpg">')
	} else if (sentido == 1){
		document.write('<img class ="direccion" src="flechas/derecha.jpg">')
	} else if (sentido == 3){
		document.write('<img class ="direccion" src="flechas/izquierda.jpg">')
	} else {
		document.write('<img class ="direccion" src="flechas/abajo.jpg">')
	}
}
//Salto de linea
document.write("<br/>");

//Funcion que llamamos al pinchar en el boton avanzar
function avanzar(){
	//recorremos la matriz, tanto filas como columnas
	for (i = 9; i>=0; i--){
		for (j = 0; j<=9; j++){
			//cuando encontremos la nave entramos al if, hasta entonces recorreremos la matriz
			if (matrizPlaneta[i][j] == rover){
				//cuando encontramos la nave, esa posición en la que se encuentra actualmente la dejamos vacia, es decir, pintamos esa posicion de la tabla sin nave.
				matrizPlaneta[i][j] = "||[" + i + "][" + j + "]||";
				//ahora dependiendo de la direccion y de la posicion en el "planeta", pintamos a rover en la posicion de la matriz correspondiente
				//i = coordenadas Y (vertical) --- j = coordenadas X (horizontal)
				//Si mira hacia el norte pero estamos en la parte de arriba del planeta [9][j], tenemos que poner la nave abajo, es decir [0][j]
				//Si no esta en la parte de arriba del todo, simplemente le sumamos 1 al eje de las Y, que es nuestra [i]
				if (sentido == 0){
					//norte - arriba
					if (i == 9){
						matrizPlaneta[0][j] = rover;
					} else {
						matrizPlaneta[i+1][j] = rover;
					}
				//Si mira hacia el este pero estamos en la parte derecha del planeta [i][9], tenemos que poner la nave a la izquierda, es decir [i][0]
				//Si no esta en la parte derecha del todo, simplemente le sumamos uno al eje de las X, que es nuestra [j]
				} else if (sentido == 1){
					//este - derecha
					if (j == 9){
						matrizPlaneta[i][0] = rover;
					} else {
						matrizPlaneta[i][j+1] = rover;
					}
				//Si mira hacia el sur pero estamos en la parte de abajo del planeta [0][j], tenemos que poner la nave arriba, es decir [9][j]
				//Si no esta en la parte de abajo del todo, simplemente le restamos 1 al eje de las Y, que es nuestra [i]
				} else if (sentido == 2){
					//sur - abajo
					if (i == 0){
						matrizPlaneta[9][j] = rover;
					} else {
						matrizPlaneta[i-1][j] = rover;
					}
				//Si mira hacia el oeste pero estamos en la parte izquierda del planeta [i][0], tenemos que poner la nave a la derecha, es decir [i][9]
				//Si no esta en la parte izquierda del todo, simplemente le restamos uno al eje de las X, que es nuestra [j]
				} else {
					//oeste - izquierda
					if (j == 0){
						matrizPlaneta[i][9] = rover;
					} else {
						matrizPlaneta[i][j-1] = rover;
					}
				}
				//pintamos la tabla cuando terminamos de mover la nave rover
				pintar();
				//salimos del bucle for
				break;
			}
		}
	}
}

//Cambiamos el sentido del rover, nuestra nave, una posicion a la izquierda de donde estuviera mirando.
function girarIzq(){
	//Si esta mirando hacia el norte que es nuestro numero 0, para llegar al oeste, en vez de restarle 1, lo igualamos a 3
	if (sentido == 0){
		sentido = 3;
	} else {
		sentido = sentido - 1;
	}
	//Aqui llamo a la funcion pintar para que me pinte la tabla con la nueva imagen indicando la posición de la nave rover
	pintar();
}

//hecho de forma rápida y poco eficiente. Simplemente giramos dos veces sobre si misma, avanzamos una posicion y la volvemos a poner en la dirección  que estaba
function retroceso(){
	girarIzq();
	girarIzq();
	avanzar();
	girarDer();
	girarDer();
}

//Cambiamos el sentido del rover, nuestra nave, una posicion a la derecha de donde estuviera mirando.
function girarDer(){
	//Si esta mirando hacia el oeste que es nuestro numero 3, para llegar al norte en vez de sumarle 1, lo igualamos a 0
	if (sentido == 3){
		sentido = 0;
	} else {
		sentido = sentido + 1;
	}
	//Aqui llamo a la funcion pintar para que me pinte la tabla con la nueva imagen indicando la posición de la nave rover
	pintar();
}