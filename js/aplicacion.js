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
//  d. #Fatalitie: Elementos vitales del funcionamiento.
//Las etiquetas siempre van al final de los comentarios, su objetivo es unicamente la facilidad de busqueda.
//10. Para todos los propositos se usan comillas simples (''). lAS COMILLAS DOBLES SOLO SE USAN PARA ESTAR DENTRO DE UN STRING, ejemplo: let str = 'El gato me dijo: "Estas muy drogado" sin embargo, Yo nunca le crei.'
//11. El ';' es inecesario, es opcional pero preferiblemente no se usa


const canvas = document.getElementById('canvas1') //Objeto Canvas en el que se dibuja parcialmente la imagen subida
const context = canvas.getContext("2d") //Contexo 2d del canvas en el que se puede dibujar
const fileinput = document.getElementById('image') //Nodo del Input para las imagenes
var img = new Image() //Variable que representa la imagen actual.
var imagenes = []
var imagenesData = []
var grietasArray = []

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
        alert('Por favor introduce una imagen.') //Mensaje de error
    }
}
function test1() { //Este test era para probar si podia usar la imagen despues de que los eventos anteriores actuen.
	context.drawImage(img,0,0)
}
function filtro1(th) { //Forma de extraer contronos por edge detecting.
	let g
	let inamgenEntrada,	imagenSalida 	//crea dos variables que represnetanals imagenes
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
				imagenes.push(g) //Agrega el elemento alarreglo
				imagenesData.push(imagenSalida)
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
function MarvinImageToRGBAMatrix(MImagen) {//Para el analisis se pasa una Marvin Imagen y seretorna una matriz del tamaño de la imagen donde cada casilla representa un color. Cada color tiene 4 casillas [0] = Red, [1] = Green, [2] = Blue, [3] = Alpha
	let rawData = MImagen.imageData.data //Obtiene el data de la imagen
	let arr = []
	for (var i = 0; i < rawData.length; i+=4) { //Recorre la imagen de 4 en 4
		let r = rawData[i+0]
		let g = rawData[i+1]
		let b = rawData[i+2]
		let a = rawData[i+3]
		let arrayTemporal = [r,g,b,a] //crea un arreglo que corresponde a cada pixel
		arr.push(arrayTemporal) //Agrega cada pixel en un arreglo
	}
	let array = arregloAMatriz(arr,MImagen.width) //Crea una matriz
	return array
}
function ImageToRGBAMatrix(image) {//Para el analisis se pasa una Imagen y seretorna una matriz del tamaño de la imagen donde cada casilla representa un color. Cada color tiene 4 casillas [0] = Red, [1] = Green, [2] = Blue, [3] = Alpha
	let cv = document.createElement('canvas') //Crea un canvas virtual
	cv.width = image.width //Modifica sus propiedades
	cv.height = image.height
	let cx = cv.getContext('2d') //Obtiene el contexto 2d
	cx.drawImage(image,0,0,cv.width,cv.height) //Pone la imagen en el canvas
	let rawData = cx.getImageData(0,0,cv.width,cv.height).data //Extrae la data de la imgen del canvas
	let arr = []
		for (let i = 0; i < rawData.length; i+=4) { //Recorre la imagen de 4 en 4
		let r = rawData[i+0]
		let g = rawData[i+1]
		let b = rawData[i+2]
		let a = rawData[i+3]
		let arrayTemporal = [r,g,b,a] //crea un arreglo que corresponde a cada pixel
		arr.push(arrayTemporal) //Agrega cada pixel en un arreglo
	}
	let array = arregloAMatriz(arr,cv.width) //Crea una matriz
	return array
}
function arregloAMatriz(arreglo,numeroFilas) { //Convierte un arreglo a una matriz con el numero de filas especificado. las columnas se adaptan. Si la ultimafila no se alcanza a completar esta nose agrega. #Algoritmico
	let f = 0
	let matrix = []
	let parcial = []
	for (let i = 0; i < arreglo.length + 1; i++) { //Recorre todas las casillas de la matriz
		if (i%numeroFilas == 0 && i != 0) { //Cuando esa condicion pasa se agrega una nueva fila.
			matrix[f] = parcial //Agrega una nueva fila
			f++ //Agrega uno al contador
			parcial = [] //Reinicia la fila
		}
		parcial.push(arreglo[i]) //Agrega un elemento a la fila
	}
	return matrix //Retorna el resultado.
}
function RGBMatrixToCanvas(matrix,canvas) { //Pone una matriz RGB o RGBA en un canvas que se pasa por marametro #Grafico.
	let ctx = canvas.getContext('2d') //Obtiene el contexto 2d del canvas
	for (let i = 0; i < matrix.length; i++) { //Recorre cada una de las filas de la matriz
		for (let j = 0; j < matrix[i].length; j++) { //Recorre cada uno de las columnas en la fila i.
			let r = matrix[i][j][0] //Obtiene el color rojo
			let g = matrix[i][j][1] //Obtiene el color verde
			let b = matrix[i][j][2] //Obtiene el color azul
			ctx.fillStyle = "rgba("+r+","+g+","+b+", 1)" //Asigna el color para dibujar
			ctx.fillRect( j, i, 1, 1 ) //Dibuja un pixel.
		}
	}
}
function RGBMatrixToImage(matrix) {
	let cv = document.createElement('canvas') //Crea un canvas virtual
	cv.width = matrix[0].length //Modifica sus propiedades
	cv.height = matrix.length
	RGBMatrixToCanvas(matrix,cv) //pone la imagen en un canvas
    let image = new Image() //Crea una nueva imagen
	image.height = cv.height
    image.width = cv.width
    image.src = cv.toDataURL() //Extrae el base64 de la imagen del canvas.
	return image //Retorna la imagen resultado no tiene en cuanta el onload
}
function generarGrietas(i,j,arreglo,matriz) { //GENERA LOSARREGLOS QUE CONTIENEN LAS GRIETAS #Algoritmico #Fatalitie
	if (matriz[i][j+1][0] == 0 && matriz[i][j+1][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i][j+1][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + i + ',' + (j+1)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i,j+1,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	} if (matriz[i][j-1][0] == 0 && matriz[i][j-1][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i][j-1][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + i + ',' + (j-1)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i,j-1,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	} if (matriz[i+1][j+1][0] == 0 && matriz[i+1][j+1][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i+1][j+1][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + (i+1) + ',' + (j+1)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i+1,j+1,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	} if (matriz[i+1][j-1][0] == 0 && matriz[i+1][j-1][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i+1][j-1][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + (i+1) + ',' + (j-1)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i+1,j-1,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	} if (matriz[i-1][j+1][0] == 0 && matriz[i-1][j+1][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i-1][j+1][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + (i-1) + ',' + (j+1)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i-1,j+1,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	} if (matriz[i-1][j-1][0] == 0 && matriz[i-1][j-1][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i-1][j-1][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + (i-1) + ',' + (j-1)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i-1,j-1,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	} if (matriz[i+1][j][0] == 0 && matriz[i+1][j][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i+1][j][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + (i+1) + ',' + (j)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i+1,j,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	} if (matriz[i-1][j][0] == 0 && matriz[i-1][j][4] != 1) { //Revisa si el pixel de al lado es negro
		matriz[i-1][j][4] = 1 //Marca el pixel como "Ya revisado"
		arreglo.push('Grieta;' + (i-1) + ',' + (j)) //Agrega el pixel al arreglo de grietas
		arreglo.concat(generarGrietas(i-1,j,arreglo,matriz)) //Recurre en esepixel para verificar la continuidad
	}
	return arreglo //Retornael arreglo de Una sola grieta
}
function getGrietas(image,tolerancia) { //Encuentra todas las grietas de la imagen que se pasa como parametro, la tolerancia hace referencia a la longitud minima de la grieta en pixeles. #Algoritmico
	let grietas = [] //Crea un arreglo de grietas vacio
	let matrix = ImageToRGBAMatrix(image) //Encuentra la matriz RGBA de la imagen seleccioanda
	for (var i = 1; i < matrix.length-1; i++) { //Recorre cada fila de la matriz
		for (var j = 1; j < matrix[i].length-1; j++) { //Recorre cada pixel por la fila i
			let arreglo = [] //Crea un arreglo parcial para almacenar una grieta
			if (matrix[i][j][4] != 1) {
				let grietai = generarGrietas(i,j,arreglo,matrix) //Encuentra la grieta en ese pixel
				if (grietai.length >= tolerancia) { //Verifica la tolerancia de la grieta
					grietas.push(grietai) //Agrega la grieta al arreglo
				}
			}
		}
	}
	return grietas //Retorna un arreglo de grietas
}
function drawGrietas(grietas,canvas) { //Dibuja un arreglo de grietas en un canvas por parametro #Grafico
	let ctx = canvas.getContext('2d') //Encuentra el contexto 2d
	for (var i = 0; i < grietas.length; i++) { //Recorre cada una de las grietas
		let grieticas = grietas[i] //Guarda la grieta en un arreglo porque si [Esta linea en parte sobra]
		for (var j = 0; j < grieticas.length; j++) { //Recorre cada pixel de la grieta
			ctx.fillStyle = "rgba("+0+","+0+","+0+", 1)" //Se asigna el color negro
			let a = grieticas[j].split(';')[1].split(',')[0] //Selecciona el pixel x
			let b = grieticas[j].split(';')[1].split(',')[1] //Selecciona el pixel y
			ctx.fillRect( b, a, 1, 1 ) //Pinta el pixel pertenenciente a la Grieta
		}
	}
}
function dibujarGrietas(imagen) { //Agrega una imagen con las nuevas grietas #Grafico
	let u = document.createElement('canvas') //Crea un canvas
	u.width = imagen.width //Modifica sus propiedades
	u.height = imagen.height
	let grietas = getGrietas(imagen,parseInt(document.getElementById('tol').value)) //Crea las nuevas grietas
	drawGrietas(grietas,u) //Dibuja las grietas en el canvas

    let image = new Image() //Crea una nueva imagen
    image.src = u.toDataURL() //Extrae el base64 de la imagen del canvas.
	return image //Retorna la imagen resultado, sin embargo
}
function agregarAlCarrusel(imagenes,tipo) { //Agrega un arreglode imagenes alcarrusel #Grafico
	var a  = ''
	if (tipo == 'Grietas') {
		a = 'Grieta Numero:'
	} else if (tipo == 'Data') {
		a = 'Resultado Numero:'
	} else {
		a = ''
	}
	let parent = document.getElementById('carrussel')
	parent.className = parent.className.replace("invisible", "visible");
	let parent2 = document.getElementById('dots')
	for (var i = 0; i < imagenes.length; i++) {
		let node = document.createElement('div')
		node.setAttribute('class','mySlides')
		let node2 = document.createElement('div')
		node2.setAttribute('class','numbertext')
		node2.textContent = ''+ (i+1) + '/' + imagenes.length
		let node3 = imagenes[i]
		node3.setAttribute('style',"width:100%")
		let node4 = document.createElement('div')
		node4.setAttribute('class','textCar')
		node4.textContent = a + ' ' + (i+1)
		node.appendChild(node2)
		node.appendChild(node3)
		node.appendChild(node4)
		parent.appendChild(node)

		let doti = document.createElement('span')
		doti.setAttribute('class','dot')
		doti.setAttribute('onclick','currentSlide('+(i+1)+')')
		parent2.appendChild(doti)
		showSlides(slideIndex);
	}
}
function grietasMultiple(imagenes) { //Genera las grietas para un conjunto de resultados
	for (var i = 0; i < imagenes.length; i++) {
		let g = dibujarGrietas(imagenes[i])
		g.onload = function() {
			grietasArray.push(g)
		}
	}
}