const getDMs = require('../tweets/getDMs.js');
const filterDMs = require('./filterDMs.js');
const indentifyClaim = require('./indentifyClaim.js');
const getLatestTweets = require('../tweets/getLatestTweets.js');
const isItAWarn = require('./isItAWarn.js');
const createTweet = require('./createTweet.js');
const postTweet = require('../tweets/postTweet.js');

const main = async () => {

	// Pegamos todas as DMs retornadas pela função da biblioteca do twitter.
	// (Todas as DMs recebidas e enviadas nos últimos 30 dias).
	const allDMs = await getDMs();

	// console.log(allDMs);

	// Verificamos se, de fato, há DMs.
	if (allDMs.length) {

		// Filtramos as DMs. Pegamos as das últimas 3 horas,
		// e que contenham 'fila' em seu texto.
		const validDMs = filterDMs(allDMs);

		// console.log(validDMs);

		// Verificamos se há DMs que passam no filtro.
		if (validDMs.length) {

			// E, enfim, vemos se algum restaurante teve  mais avisos sobre fila que o mínimo necessário.
			// Avisos de usuários únicos.
			const claimedRestaurants = indentifyClaim(validDMs);

			// console.log(claimedRestaurants);

			if (claimedRestaurants.length) {

				// Se teve, precisamos verificar se o aviso já foi dado.
				// Para isso, pegamos o último tweet do bot (o 20).
				let latestTweets = await getLatestTweets();

				let lastTweet = latestTweets[19];

				// E verificamos se o texto corresponde ao aviso.
				if (!isItAWarn(lastTweet)) {
				// Se não corresponde, podemos criar o tweet, e, finalmente, avisar os alunos.

					const tweet = createTweet(claimedRestaurants);

					console.log(tweet);

				};

			};

		};
	};

};

main();