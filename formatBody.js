module.exports = function(body){

	let rawResponse = body.match(/\[\{cdpdia:(.(\s)?)*\}\]/)[0];

	let responseObject = eval('(' + rawResponse + ')');

	const date = new Date();
	const weekDay = date.getDay() + 1;
	const meal = (date.getHours() < 15) ? 'A' : 'J';

	const menu = {

		food: [],
		meal,
		info: []

	};

	// Filtra o dia da semana e a refeição
	let responseOfTheDay = responseObject.filter(item => {
		return item.diasemana === weekDay && item.tiprfi === meal;
	});

	// Seleciona o menu
	let dayMenu = responseOfTheDay[0].cdpdia

	// Regex utilizado para remover itens básicos do cardápio e informações de
	// feriado ou restaurante fechado.
	let removeItems = /arroz( integral)?|minipão|refresco|feriado|fechado|funcionamento|abertura/i;

	// Se não existe 'arroz' no menu, não há cardapio
	// Ignoramos estes casos
	if (dayMenu.indexOf('arroz') !== -1) {

		menu.food = firstUpperCase(dayMenu
			// Substitui "Opção" por "ou" para fazer um texto mais fluido
			.replace(/ *<br>Opção:/gi, ' ou')
			// Cria um array
			.split(/<br>/)
			// Remove elementos vazios e aqueles identificados no regex mencionado acima
			.filter(item => {

				if (/funcionamento|abertura/i.test(item)) {

					menu.info.push(item);
				}

				return item && !removeItems.test(item)
			})
			// Deixa a primeira letra de cada item do array maiúscula
			.map(item => item.slice(0,1).toUpperCase() + item.trim().slice(1).toLowerCase())
		)
	}

	if (menu.info.length) {

		menu.info = firstUpperCase(menu.info);
	};

	return menu;
}

function firstUpperCase(array) {

	return array
		.map(item => item
			.slice(0,1)
			.toUpperCase() +
			item
				.trim()
				.slice(1)
				.toLowerCase())

	return array;
};
