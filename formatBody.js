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

	// Filtra o dia da semana e a refeição.
	let responseOfTheDay = responseObject.filter(item => {
		return item.diasemana === weekDay && item.tiprfi === meal;
	});

	// Retorna o menu vazio se não há cardápio para o dia.
	if (!responseOfTheDay.length) return menu;

	// Seleciona o menu dentro do objeto complexo.
	let dayMenu = responseOfTheDay[0].cdpdia;

	if (!dayMenu) return menu;

	// Se não existe 'arroz' no menu, não há cardapio.
	// Ignoramos estes casos.
	if (!/arroz/i.test(dayMenu)) return menu;

	// Regex utilizado para remover itens básicos do cardápio e informações de
	// feriado ou restaurante fechado.
	let removeItems = /arroz( integral)?|minipão|refresco|feriado|fechado|funcionamento|abertura/i;

	menu.food = firstUpperCase(dayMenu
		// Substitui "Opção" por "ou" para fazer um texto mais fluido.
		.replace(/ *<br>Opção:/gi, ' ou')
		// Cria um array
		.split(/<br>/)
		// Remove elementos vazios e aqueles identificados no regex mencionado acima.
		.filter(item => {

			if (/funcionamento|abertura/i.test(item)) {

				menu.info.push(item);
			}

			return item && !removeItems.test(item)
		})
		// Substitui / por ou.
		.map(item => item.replace('/', ' ou '))
	)

	// A função saladaMix junta vários "Salada de x" em um único
	// "Saladas de x, y ou z".
	menu.food = saladaMix(menu.food);

	if (menu.info.length) {

		menu.info = firstUpperCase(menu.info);
	};

	return menu;
}

function firstUpperCase(array) {
// Deixa a primeira letra de cada item do array maiúscula.
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

function saladaMix(menu) {

	let saladas = menu.filter(item => /salada/i.test(item));

	// Se não há saladas ou há apenas uma, nada de ver feito.
	if (saladas.length <= 1) return menu;

	// Remove as saladas separadas do menu.
	for (let s of saladas) {
		menu.splice(menu.indexOf(s), 1)
	};

	let mix = saladas.reduce((msg, item) => {

		let append = ',';

		if (saladas.length - 2 === saladas.indexOf(item)) append = ' ou'
		if (saladas.length - 1 === saladas.indexOf(item)) append = ''

		return msg + item.substr(9) + append;

	}, 'Saladas de')

	// Adiciona na penúltima posição.
	menu.splice(menu.length - 1, 0, mix);

	return menu;
}