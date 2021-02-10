const mapMeals = {
	'A': 'almoço',
	'J': 'jantar'
};

module.exports = (menu, bandejao) => {
	
	const meal = mapMeals[menu.meal];
	
	menu.food.forEach((item, index) => menu.food[index] = '· ' + item);
	
	const header = `Hoje no ${meal} d${bandejao.gender} ${bandejao.name} tem:\n\n`;
	
	let tweet = header + menu.food.join('\n');

	if (menu.info.length) {

		let infoHeader = `\n\n*${menu.info[0]}: ${menu.info[1].replace('  ', ' e ').toLowerCase()}.`

		tweet += infoHeader;
	}

	return tweet;
	
}
