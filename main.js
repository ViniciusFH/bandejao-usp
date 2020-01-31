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

	const restaurantsID = {
		'Central' : 6,
		'Prefeitura' : 7,
		'Fisica' : 8,
		'Quimica' : 9
	};

	const date = new Date().toLocaleString()

	for(let name in restaurantsID) {

		let cardapio = formatBody(await getBody(restaurantsID[name]));

		if (cardapio.length) {

			let tweet = createTweet(cardapio, name)

			postTweet(tweet);

			await sleep(10000);
		};

	};
	
};

main()