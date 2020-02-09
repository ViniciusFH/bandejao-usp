module.exports = function(menu, restaurant){
	
	const meal = {
		'A': 'almoço',
		'J': 'jantar'
	}[menu.meal];
	
	menu.food.forEach((item, index) => menu.food[index] = '· ' + item);
	
	let doDa = {
        Central: "do",
        Química: "da",
        Física: "da",
        Prefeitura: "do",
        'Saúde Pública': 'da',
        'Escola de Enfermagem': 'da',
        'EACH': 'da'
	}
	
	let header = `Hoje no ${meal} ${doDa[restaurant]} ${restaurant} tem:\n\n`;
	
	let tweet = header + menu.food.join('\n');

	if (menu.info.length) {

		let infoHeader = `\n\n*${menu.info[0]}: ${menu.info[1].replace('  ', ' e ').toLowerCase()}.`

		tweet += infoHeader;
	}

	return tweet;
	
}
