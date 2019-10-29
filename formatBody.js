module.exports = function(body){

	let rawResponse = body.match(/\[\{cdpdia:(.(\s)?)*\}\]/)[0];

	let responseObject = eval('(' + rawResponse + ')');

	const date = new Date();
	const weekDay = date.getDay() + 1;
	const meal = (date.getHours() < 12) ? 'A' : 'J';

	let cardapio = [];

	responseObject
		.filter(menu => menu.diasemana === weekDay && menu.tiprfi === meal)
		.forEach(menu => {
			cardapio = menu.cdpdia
				.replace(/arroz ?(integral)?|minipão|refresco|\//gi, '')
				.replace(/<br>Opção:/gi, ' ou')
				.split(/<br>/)
				.filter(item => item)
				.map(item => item.slice(0,1).toUpperCase() + item.trim().slice(1).toLowerCase())
				.filter(item => item !== 'Feijão')
		})


	return cardapio;
}