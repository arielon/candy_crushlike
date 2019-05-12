$(function () {
	//1. Cambio de colores
	var colors = ["white", "#DCFF0E"]
	changeColors()

	function changeColors() {
		var titulo = $(".main-titulo");
		var color = titulo.data("color") === undefined ? 0 : titulo.data("color") + 1;
		titulo.data("color", color % colors.length).delay(800).animate({
			color: colors[titulo.data("color")]
		}, 800, changeColors)
	}

	//Iniciar botón
	$(".btn-reinicio").click(function () {
		if ($(this).text() === "Iniciar") {
			$(this).text("Reiniciar")
			crearFila()
			detectarColumna()
		} else {
			$(this).text("Iniciar")
		}
	})

	//2. Agregar dulces
	function crearFila() {
		for (i = 0; i < 7; i++) {
			$(".panel-tablero > div").append("<img src='' class='elemento'/>")
			$(".elemento").attr("src", function () {
				var numero = Math.floor((Math.random() * 4) + 1)
				var ruta = "image/" + numero + ".png"
				return ruta
			})
		}
	}

	function detectarColumna() {
		var columna1 = $(".col-1").children()

		var matrizElementos = []
		for (var i = 0; i < 7; i++) {
			var dulcesColumna = []
			$(columna1).each(function () {
				dulcesColumna.push($(this))
			})
			matrizElementos.push(dulcesColumna)
		}

		var dulce1 = matrizElementos[0][0]
		var dulce2 = matrizElementos[0][1]
		var dulce3 = matrizElementos[0][2]
		var dulce4 = matrizElementos[0][3]
		var dulce5 = matrizElementos[0][4]
		var dulce6 = matrizElementos[0][5]
		var dulce7 = matrizElementos[0][6]

		var dulceC1 = matrizElementos[0][0].attr("src")
		var dulceC2 = matrizElementos[0][1].attr("src")
		var dulceC3 = matrizElementos[0][2].attr("src")
		var dulceC4 = matrizElementos[0][3].attr("src")
		var dulceC5 = matrizElementos[0][4].attr("src")
		var dulceC6 = matrizElementos[0][5].attr("src")
		var dulceC7 = matrizElementos[0][6].attr("src")


		if (dulceC1 == dulceC2 && dulceC2 == dulceC3) {
			$([dulce1, dulce2, dulce3]).each(function() {
				$(this).effect('pulsate', 1000)
				$(this).animate({
					opacity: '0'
				}, {
					duration: 800
				}).animate({
					opacity: '0'
				})
			})
		}
		if (dulceC2 == dulceC3 && dulceC3 == dulceC4) {
			$([dulce2, dulce3, dulce4]).each(function() {
				$(this).effect('pulsate', 1000)
				$(this).animate({
					opacity: '0'
				}, {
					duration: 800
				}).animate({
					opacity: '0'
				})
			})
		}
		if (dulceC3 == dulceC4 && dulceC4 == dulceC5) {
			$([dulce3, dulce4, dulce5]).each(function() {
				$(this).effect('pulsate', 1000)
				$(this).animate({
					opacity: '0'
				}, {
					duration: 800
				}).animate({
					opacity: '0'
				})
			})
		}
		if (dulceC4 == dulceC5 && dulceC5 == dulceC6) {
			$([dulce4, dulce5, dulce6]).each(function() {
				$(this).effect('pulsate', 1000)
				$(this).animate({
					opacity: '0'
				}, {
					duration: 800
				}).animate({
					opacity: '0'
				})
			})
		}
		if (dulceC5 == dulceC6 && dulceC6 == dulceC7) {
			$([dulce5, dulce6, dulce7]).each(function() {
				$(this).effect('pulsate', 1000)
				$(this).animate({
					opacity: '0'
				}, {
					duration: 800
				}).animate({
					opacity: '0'
				})
			})
		}

		for (let i = 0; i < 1; i++) {
			for (var j = 0; j < 5; j++) {
				//y_itemAnterior = matrizElementos[i][j].substr(6, 1)
				//y_itemActual = matrizElementos[i][j + 1].substr(6, 1)
				//y_itemSiguiente = matrizElementos[i][j + 2].substr(6, 1)

				/*
				if (y_itemActual == "1") {
					var dulce1 = 1
				}
				if (y_itemActual == "2") {
					var dulce2 = 2
				}
				if (y_itemActual == "3") {
					var dulce3 = 3
				}
				if (y_itemActual == "4") {
					var dulce4 = 4
				}
				if (y_itemAnterior == "1") {
					var prevdulce1 = 1
				}
				if (y_itemAnterior == "2") {
					var prevdulce2 = 2
				}
				if (y_itemAnterior == "3") {
					var prevdulce3 = 3
				}
				if (y_itemAnterior == "4") {
					var prevdulce4 = 4
				}
				if (y_itemSiguiente == "1") {
					var postdulce1 = 1
				}
				if (y_itemSiguiente == "2") {
					var postdulce2 = 2
				}
				if (y_itemSiguiente == "3") {
					var postdulce3 = 3
				}
				if (y_itemSiguiente == "4") {
					var postdulce4 = 4
				}
				*/
				//var coincidencia1 = (dulce1 == prevdulce1 && dulce1 == postdulce1)

				/*
				var productIds = {};
				$('.list').each(function () {
					var prodId = $(this).attr('data-productid');
					if (productIds[prodId]) {
						$(this).remove();
					} else {
						productIds[prodId] = true;
					}
				})
				*/
			}
		}

		/*
		$("#att").click(function () {
			dulce6.hide("drop", {
				direction: "down"
			}, "slow")
		})
		*/
	}
})