async function main() {

	const getBody = require('./getBody');
	const formatBody = require('./formatBody');
	const createTweet = require('./createTweet');
	const postTweet = require('./postTweet');

	// Função para dar um espaço de tempo entre os tweets.
	// Para usar: await sleep(2000)
	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const restaurants = {
		'Central' : {'ID' : 6},
		'Prefeitura' : {'ID' : 7},
		'Fisica' : {'ID' : 8},
		'Quimica' : {'ID' : 9}
	}

	for(let name in restaurants) {
		restaurants[name].cardapio = formatBody(await getBody(restaurants[name].ID))
		if (restaurants[name].cardapio.length > 0) {
			// console.log(createTweet(restaurants[name].cardapio, name))
		}
	}

	
};

main()