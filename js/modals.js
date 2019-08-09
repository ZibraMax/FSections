var span = document.getElementsByClassName("botonCerrarModal")[0];
var modals = document.getElementsByClassName('modal')

function abrirModal(modalid) {
	let modal = document.getElementById(modalid);
	modal.style.display = "block";
}

span.onclick = function() {
	for (var i = 0; i < modals.length; i++) {
		modals[i].style.display = "none";
	}
}

window.onclick = function(event) {
	for (var i = 0; i < modals.length; i++) {
		if (event.target == modals[i]) {
			modals[i].style.display = "none";
		}
	}
}

document.addEventListener('keydown',function(event) {
	if (event.keyCode == 27) {
		for (var i = 0; i < modals.length; i++) {
			modals[i].style.display = "none";
		}
	}
})