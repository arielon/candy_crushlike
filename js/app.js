$(function () {
	//1. Cambio de colores
	var colors = ["white", "#DCFF0E"]
	changeColors()

	function changeColors() {
		var titulo = $(".main-titulo")
		var color = titulo.data("color") === undefined ? 0 : titulo.data("color") + 1
		titulo.data("color", color % colors.length).delay(800).animate({
			color: colors[titulo.data("color")]
		}, 800, changeColors)
	}

	//2. Llenado de dulces aleatorios
	function elementos() {
		for (var i = 0; i <= 7; i++) {
			for (var j = 0; j < 7; j++) {
				var numero = Math.floor((Math.random() * 4) + 1)
				$(".col-" + i).append("<img class= 'elemento' src='image/" + numero + ".png'>")
			}
		}
		$('.elemento').css("cursor", "move")
		buscarCoincidencia()
	}

	function Columnas() {
		var ac = false
		for (var c = 1; c <= 7; c++) {
			for (var f = 1; f <= 7; f++) {
				imagen1 = $(".col-" + c).children("img:nth-child(" + f + ")").attr("src")
				imagen2 = $(".col-" + c).children("img:nth-child(" + (f + 1) + ")").attr("src")
				imagen3 = $(".col-" + c).children("img:nth-child(" + (f + 2) + ")").attr("src")
				if (imagen1 == imagen2 && imagen2 == imagen3) {
					$(".col-" + c).children("img:nth-child(" + f + ")").attr("class", "elemento igual")
					$(".col-" + c).children("img:nth-child(" + (f + 1) + ")").attr("class", "elemento igual")
					$(".col-" + c).children("img:nth-child(" + (f + 2) + ")").attr("class", "elemento igual")
					ac = true
				}
			}
		}
		return ac
	}

	function Filas() {
		var af = false
		for (var f = 1; f <= 7; f++) {
			for (var c = 1; c <= 7; c++) {
				imagen1 = $(".col-" + f).children("img:nth-child(" + c + ")").attr("src")
				imagen2 = $(".col-" + (f + 1)).children("img:nth-child(" + c + ")").attr("src")
				imagen3 = $(".col-" + (f + 2)).children("img:nth-child(" + c + ")").attr("src")
				if (imagen1 == imagen2 && imagen2 == imagen3) {
					$(".col-" + f).children("img:nth-child(" + c + ")").attr("class", "elemento igual")
					$(".col-" + (f + 1)).children("img:nth-child(" + c + ")").attr("class", "elemento igual")
					$(".col-" + (f + 2)).children("img:nth-child(" + c + ")").attr("class", "elemento igual")
					af = true
				}
			}
		}
		return af
	}

	function buscarCoincidencia() {
		anf = Filas()
		anc = Columnas()
		if (anf == true || anc == true) {
			BorrarDulces()
		} else {
			MoverDulces()
		}
	}

	//3. Animación y puntaje del juego
	function BorrarDulces() {
		$(".igual").effect('pulsate', 1000)
		$(".igual").animate({
			opacity: '0'
		}, {
			duration: 800
		}).animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				$(this).remove()
				scorePoints()
				setTimeout(DulcesNuevos, 200)
			},
			queue: true
		})

		function scorePoints() {
			if ($('#timer').text() != '00:00') {
				puntos = parseInt($('#score-text').text()) + 10;
				$('#score-text').text(puntos)
			}
		}
	}

	function DulcesNuevos() {
		for (var c = 1; c <= 7; c++) {
			for (var f = 1; f <= 7; f++) {
				if ($(".col-" + f).children("img:nth-child(" + c + ")").html() == null) {
					var numero = Math.floor((Math.random() * 4) + 1)
					$(".col-" + f).prepend("<img class= 'elemento' src='image/" + numero + ".png'>")
				}
			}
		}
		$('.elemento').css("cursor", "move")
		buscarCoincidencia()
	}

	//7. Mover dulces Drag & Drop
	var MovimientoTotal = 0

	function MoverDulces() {
		var dulce1
		var dulce2
		var dulceSrc1
		var dulceSrc2
		$("img").draggable({
			revert: true,
			containment: ".panel-tablero",
			revertDuration: 500,
			grid: [104, 104],
			zIndex: 10,
			drag: constrainCandyMovement,
			start: function () {
				dulce1 = this
				dulceSrc1 = $(this).attr("src")
			}
		})
		// 5. Anotación de movimientos
		$("img").droppable({
			drop: function () {
				dulce2 = this
				dulceSrc2 = $(this).attr("src")
				$(dulce2).attr("src", dulceSrc1)
				$(dulce1).attr("src", dulceSrc2)
				MovimientoTotal = MovimientoTotal + 1
				$("#movimientos-text").html(MovimientoTotal)
				setTimeout(buscarCoincidencia, 400)
			}
		})
	}

	function constrainCandyMovement(event, candyDrag) {
		candyDrag.position.top = Math.min(100, candyDrag.position.top);
		candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
		candyDrag.position.left = Math.min(105, candyDrag.position.left);
		candyDrag.position.right = Math.min(105, candyDrag.position.right);
	}

	//4. Temporizador
	function startTimer(duration, display) {
		var timer = duration,
			minutes, seconds
		setInterval(function () {
			minutes = parseInt(timer / 60, 10)
			seconds = parseInt(timer % 60, 10)

			minutes = minutes < 10 ? "0" + minutes : minutes
			seconds = seconds < 10 ? "0" + seconds : seconds

			display.text(minutes + ":" + seconds)

			if (--timer < 0) {
				timer = 00
				$(".panel-tablero").remove()
				$(".panel-score ").animate({
					width: "100%",
					padding: "0px 12.5%"
				})
			}
		}, 1000)
	}
	var fiveMinutes = 60 * 2,
		display = $('#timer')
	//6. Botón Iniciar y Reiniciar
	$(".btn-reinicio").click(function () {
		if ($(this).text() === "Iniciar") {
			$(this).text("Reiniciar")
			elementos()
			startTimer(fiveMinutes, display)
		} else {
			location.reload()
		}
	})

})