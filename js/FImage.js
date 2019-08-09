class FImage {
	constructor(img,src) {
		this.resultados = []
		this.grietas = []
		if (typeof(arguments[0]) == 'object') {
			if (arguments[0].src == '') {
				throw 'La imagen no tiene una ruta especificada.'
			}
			this.width = arguments[0].width
			this.height = arguments[0].height
			this.img = arguments[0]			
		} else if (typeof(arguments[0]) == 'string') {
			if (arguments[0] == '') {
				throw 'La ruta especificada esta vacia'
			}
			let img = new Image()
			img.src = arguments[0]
			img.onload = ()=>{this.width = img.width
			this.height = img.height
			this.img = img}			
			
		} else {
			throw 'No se introdujeron los parametros minimos necesarios: Intoduce una imagen o ruta para la imagen.'
		}
	}
	get matriz() {
		if (this.matrix != undefined) {
			return this.matrix
		} else {
		this.matrix = ImageToRGBAMatrix(this.img)
		}
		return this.matrix
	}
	procesarImagen(threshold) {
		let proc = new FProcesada(this.img,threshold)
		this.resultados.push()
		return this.resultados[this.resultados.length-1]
	}
	procesarImagenMultiple(thresholdInferior, thresholdSuperior) {
		for (var i = thresholdInferior; i < thresholdSuperior; i++) {
			let g = procesarImagen(i) //Crea un resultado nuevo para cada Th en el rango.
			this.resultados.push(g)
		}
	}
	crearGrieta() {
		this.resultados.push()
		return this.resultados
	}
	//Metodos estaticos
	static metodo(parameters) {
		return something
	}
}
class FProcesada {
	constructor(imagenOriginal,th) {
		let edges = edgeDetection(imagenOriginal,th)
		this.grietas = []
		this.width = arguments[0].width
		this.height = arguments[0].height
		this.img = edges		
	}
	get matriz() {
		if (this.matrix != undefined) {
			return this.matrix
		} else {
		this.matrix = ImageToRGBAMatrix(this.img)
		}
		return this.matrix
	}
	crearGrietas() {
		for (let i = 1; i < this.matriz.length-1; i++) { //Recorre cada fila de la matriz
			for (let j = 1; j < this.matriz[i].length-1; j++) { //Recorre cada pixel por la fila i
				let arreglo = [] //Crea un arreglo parcial para almacenar una grieta
				if (this.matriz[i][j][4] != 1) {
					let grietai = generarGrietas(i,j,arreglo,this.matriz) //Encuentra la grieta en ese pixel
					this.grietas.push(new FGrieta(grietai)) //Agrega la grieta al arreglo
				}
			}
		}
	}
}
class FGrieta {
	constructor(arreglo) {
		this.grieta = arreglo
	}
	//TODO Profundidad, longitud, etc.
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
	return arreglo //Retorna el arreglo de Una sola grieta
}
function edgeDetection(img,th) { //Forma de extraer contronos por edge detecting.
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
	});
		return imagenSalida
}
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