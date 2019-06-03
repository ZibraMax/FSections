'use strict'
//Inicio Aplicacion
//Autores: [Ponga su nombre si tocó el codigo]
//1. Arturo Rodriguez [ZibraMax]
//2. 
//3. 

//Arturo: Por mas que meduela, los comentarios van a ser muy utiles.
//Rules: 1. Cada linea debera ser comentada.
//2. Las lineas que sean obvias se omiten, no queremos trabajar doble.
//3. El codigo lo van a tocar pocas personas, puede llevar tecnicismos.
//4. Declaraciones:
//	a. Variables globales con 'const'.
//	b. Variables locales: Contadores, zanahorias, etc con 'let'.
//	c. 'Var' solo se usara para variables globales que se sometan a cambios.
//5. Todas las variables globales se declaran al principio
//6. Las funciones de apoyo se declraran en su seccion correspondiente al igual que las funcionalidades.
//7. Identar el codigo, Sublime es una chimba para eso xd.
//8. Todos los commits de este archivo deben especificar el bug que se arreglo y lo que se implemento.
//9. Es recomendable el uso de tags '#' para encontrar procesos facilmente, asi todo lo que tenga que ver con cierto proceso estara tagueado con el nombre del proceso.
//La lista de procesos existentes hasta el momento es (Si se agregan procesos pues se aguregan aqui):
//	a. #Principal: Funcionamiento de la aplicacion, ejemplo, implementacion de botones.
//	b. #Grafico: Todo lo que cambie el estado inicial del HTML.
//	c. #Algoritmico: Todo los procesos que no interfieran la interfaz pero que sean necesarios para obtener un resultado.
//Las etiquetas siempre van al final de los comentarios, su objetivo es unicamente la facilidad de busqueda.
//10. Para todos los propositos se usan comillas simples (''). lAS COMILLAS DOBLES SOLO SE USAN PARA ESTAR DENTRO DE UN STRING, ejemplo: let str = 'El gato me dijo: "Estas muy drogado" sin embargo, Yo nunca le crei.'
//11. El ';' es inecesario, es opcional pero preferiblemente no se usa


const canvas = document.getElementById('canvas1') //Objeto Canvas en el que se dibuja parcialmente la imagen subida
const context = canvas.getContext("2d") //Contexo 2d del canvas en el que se puede dibujar
const fileinput = document.getElementById('image') //Nodo del Input para las imagenes
var img = new Image() //Variable que representa la imagen actual.

fileinput.onchange = function(evt) { //Evento que se acciona cada vez que se cambia elinput de imagen #Principal
    let files = evt.target.files //Lista de archivos que se subieron.
    let file = files[0] //Archivo que nos interesa
    if(file.type.match('image.*')) { //Esto es re loko y necesario xd
        let reader = new FileReader() //Lee el archivo de la imagen
        reader.readAsDataURL(file) //Convierte el archivo a una cadena de texto re extraña para luego pasarlo a imagen dataset
    	reader.onload = function(evt){ //Este evento se lanza cuando la imagen se termina de leer
    		if( evt.target.readyState == FileReader.DONE) { //All done :v
    			img.src = evt.target.result //Le pone como direccion al objeto img la direccion de la imagen del file reader.
    			img.onload = function() { //Esta linea es muy putamente importante, si no se verifica que la imagen cargue eso se vuelve un mierdero el hijueputa.
					context.drawImage(img,0,0) //Aqui se puede hacer lo que se quiera despues de tener la imagen. #Grafico
    			}
			}
    	}    

    } else {
        alert('Por favor introduce una imagen.')
    }
}

function test1() { //Este test era para probar si podia usar la imagen despues de que los eventos anteriores actuen.
	context.drawImage(img,0,0)
}
function test2(){
var imageExampleFilters,
	imageExampleFiltersOut	
	imageExampleFilters = new MarvinImage();
	imageExampleFilters.load(img.src, function(){
		imageExampleFilters.draw(document.getElementById("canvas1"));
		imageExampleFiltersOut = new MarvinImage(imageExampleFilters.getWidth(), imageExampleFilters.getHeight())
		imageExampleFiltersOut.clear(0xFF000000);
		Marvin.prewitt(imageExampleFilters, imageExampleFiltersOut);
		Marvin.invertColors(imageExampleFiltersOut, imageExampleFiltersOut);
		Marvin.thresholding(imageExampleFiltersOut, imageExampleFiltersOut, 150);
		imageExampleFiltersOut.draw(document.getElementById("canvas1"))
	});
}