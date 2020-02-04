module.exports = function(arrayCardapio, restaurant){
	
	const meal = (new Date().getHours() < 12) ? 'almoço' : 'jantar';
	
	arrayCardapio.forEach((item, index) => arrayCardapio[index] = '· ' + item);
	
	let deDa = {
        Central: "do",
        Quimica: "da",
        Fisica: "da",
        Prefeitura: "do"
	}
	
	let header = `Hoje no ${meal} ${deDa[restaurant]} ${restaurant} tem:\n`;
	
	let tweet = header + arrayCardapio.join('\n');
	
	return tweet;
	
	postTweet(restaurants['Central'].cardapio.join('\n· '))

}
