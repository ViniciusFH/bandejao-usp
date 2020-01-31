module.exports = function(arrayCardapio, restaurant){

	const meal = (new Date().getHours() < 12) ? 'almoço' : 'jantar';

	arrayCardapio.forEach((item, index) => arrayCardapio[index] = '· ' + item)

	let header = `Hoje no ${restaurant} tem:\n`

	let tweet = header + arrayCardapio.join('\n')

	return tweet;

	postTweet(restaurants['Central'].cardapio.join('\n· '))

}