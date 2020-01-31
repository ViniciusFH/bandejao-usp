module.exports = function(body){

	let rawResponse = body.match(/\[\{cdpdia:(.(\s)?)*\}\]/)[0];

	let responseObject = eval('(' + rawResponse + ')');

	const date = new Date();
	const weekDay = date.getDay() + 1;
	const meal = (date.getHours() < 12) ? 'A' : 'J';

	let cardapio = [];

	// Filtra o dia da semana e a refeição
	let responseOfTheDay = responseObject.filter(menu => {
		return menu.diasemana === weekDay && menu.tiprfi === meal;
	});

	// Seleciona o menu
	let menu = responseOfTheDay[0].cdpdia

	// Se não existe 'arroz' no menu, não há cardapio
	// Ignoramos estes casos
	if (menu.indexOf('arroz') !== -1) {

		cardapio = menu
			// Remove os itens básicos do cardápio
			.replace(/arroz ?(integral)?|minipão|refresco|\//gi, '')
			// Remove Feriado e Fechado
			.replace(/feriado|fechado/gi, '')
			// Substitui "opção" por "ou" para fazer um texto mais fluido
			.replace(/<br>Opção:/gi, ' ou')
			// Cria um array
			.split(/<br>/)
			// Remove elementos false ('', null, undefined) e string com espaço em branco
			.filter(item => item && /\S/.test(item))
			// Deixa a primeira letra de cada item do array maiúscula
			.map(item => item.slice(0,1).toUpperCase() + item.trim().slice(1).toLowerCase())
			// Remove 'feijão' (deixa 'feijão preto')
			.filter(item => item !== 'Feijão')
	}

	return cardapio;
}