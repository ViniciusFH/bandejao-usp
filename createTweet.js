module.exports = function(arrayCardapio, restaurant){

	const meal = (new Date().getHours() < 12) ? 'almoço' : 'jantar';

	arrayCardapio.forEach((item, index) => arrayCardapio[index] = '· ' + item)

	let header = ['H']

	return arrayCardapio;

	let tweet = ''

	postTweet(restaurants['Central'].cardapio.join('\n· '))

}