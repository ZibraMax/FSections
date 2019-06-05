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
var imagenes = []

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
					context.drawImage(img,0,0,400,400) //Aqui se puede hacer lo que se quiera despues de tener la imagen. #Grafico
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

function filtro1(th) { //Forma de extraer contronos por edge detecting.
	let g
	let inamgenEntrada,	imagenSalida //crea dos variables que represnetanals imagenes
	inamgenEntrada = new MarvinImage() //Creauna marvinimagen nueva para imagenentrada
	inamgenEntrada.load(img.src, function(){ //Se pone la imagen con el src de la variable img declarara anteriormente
		imagenSalida = new MarvinImage(inamgenEntrada.getWidth(), inamgenEntrada.getHeight()) // Crea una imagen de salida con iguales dimensiones que la imagen de entrada
		imagenSalida.clear(0xFF000000) //Pone la imagen en blanco
		Marvin.prewitt(inamgenEntrada, imagenSalida) //Proceso 1 prewitt.
		Marvin.invertColors(imagenSalida, imagenSalida) //Proceso 2 invertir colores.
		if (th == undefined) { //Cuando no se especifica el TH lo hace con el TH del documento
			th = parseFloat(document.getElementById('thresholding').value)
		}
		Marvin.thresholding(imagenSalida, imagenSalida, th); //Proceso 3 thresholding
		g = imagedata_to_image(imagenSalida.imageData) //Crea una imagen del imageData que retirna marvinj
		g.onload = function() { //Cuando la imagen se carga
			context.drawImage(g,0,0,400,400) //Imprime el resultado del filtro 1 en el canvas1
				let node = document.createElement('img') //Crea un elemento imagen
				node.setAttribute('src', g.src) //Le asigna la direccion de la imagen
				imagenes.push(node) //Agrega el elemento alarreglo
		}
	});
}


//##**&&-FUNCIONES ADICIONALES-##**&&


function imagedata_to_image(imagedata) {//Funcion que transforma un string imageData a Imagen #Algotirmico.
    let canvas = document.createElement('canvas') //Crea un canvas parcial que no se mostrara nunca.
    let ctx = canvas.getContext('2d') //Extrae el contexto 2d.
    canvas.width = imagedata.width //Encuentra las propiedades.
    canvas.height = imagedata.height 
    ctx.putImageData(imagedata, 0, 0) //Pone en el canvas ficticio la imagenData, debido a que ese metodo si lo permite.

    let image = new Image() //Crea una nueva imagen
    image.src = canvas.toDataURL() //Extrae el base64 de la imagen del canvas.
    return image //Retorna la imagen resultado, sin embargo, no tiene en cuenta el evento onload.
}

function filtroMultiple() { //Filtro que cambia el thresholding de los resultados para poder comparar #Algoritmico
	let inicio = parseInt(document.getElementById('inicio').value) //Cota de incio del TH
	let final = parseInt(document.getElementById('final').value) //Cota de fin del TH
	let outpu = document.getElementById('mensajes') //Nodo para salida de mensajes en lainterfaz 
	for (var i = inicio; i < final; i++) {
		let g = filtro1(i) //Crea un resultado nuevo para cada Th en el rango.
	}
	outpu.innerHTML = 'Se han generado ' + (final - inicio) + ' imagenes con resultados.' //Mensaje de salida
}
function descargarTodo() { //Descarga todos los resultados en el arreglo #Algoritmico
	for (var i = 0; i < imagenes.length; i++) {
		downloadThat(imagenes[i],'#' + i) //Descarga cada uno de los resultados y les asigna un nombre.
	}
}
function downloadThat(img,etiqueta) { //Descarga la imagen que se leasigna con la etiqueta #Algoritmico
	var canvasz = document.createElement("canvas") //Crea un canvas ficticio
	var ctx = canvasz.getContext('2d') //Consigue el contexto 2d del canvas
	canvasz.width = img.width //Encuentra las propiedades para igualarlas. 
    canvasz.height = img.height 
	ctx.drawImage(img,0,0) //Dibuja la imagen en el canvas
	canvasz.toBlob(function(blob) { //Convierte elcanvas en un Binare Large Object BLOB
	    saveAs(blob, 'resultado_'+ etiqueta +'.png') //Lo guarda individualmente.
	});
}