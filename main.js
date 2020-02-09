async function main() {

	const getBody = require('./getBody');
	const formatBody = require('./formatBody');
	const createTweet = require('./createTweet');
	const postTweet = require('./postTweet');

	// Função para dar um espaço de tempo entre os tweets.
	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	};

	const restaurantsID = {
		'Central' : 6,
		'Prefeitura' : 7,
		'Física' : 8,
		'Química' : 9,
		'Saúde Pública' : 11,
		'Escola de Enfermagem': 12,
		'EACH': 13
	};

	let name = process.argv[2];

	let menu = formatBody(await getBody(restaurantsID[name]));

	if (menu.food.length) {

		let tweet = createTweet(menu, name)

		// console.log(tweet);

		postTweet(tweet);

	};
	
};

main()
