// Faz o request para o endpoint da USP com os cardápios da semana.
const getBody = require('./helpers/menu/getBody');
// Formata o retorno do request feito na função acima. Retorna um objeto.
const formatBody = require('./helpers/menu/formatBody');
// Transforma o objeto retornado na função acima e cria uma string, o tweet em si.
const createTweet = require('./helpers/menu/createTweet');
// Usa o client do twitter para, enfim, postar o tweet.
const postTweet = require('./helpers/tweets/post');
// Um objeto com todos os bandejões instanciados da classe Restaurant.
const restaurants = require('./classes/Restaurants');

async function main() {

	// Nome da variável do bandejão recebida pelo comando do terminal.
	const bandejao = restaurants[process.argv[2]];

	if (!bandejao) {
	// Em tese, se não encontrou o bandejão, é porque houve erro de digitação. Idealmente, não acontecerá,
	// já que a cron ficará programada com os nomes certos.
		console.log('Você provavelmente digitou o nome da variável do bandejão errado.');

		return;
	};

	let menuBody = await getBody(bandejao.id);

	if (!menuBody) {

		console.log('Não há cardápios para esta semana, ou houve alguma alteração no endpoint da USP.');

		return;
	};

	let menu = formatBody(menuBody);

	if (menu.food.length) {

		let tweet = createTweet(menu, bandejao)

		postTweet(tweet);

	};
	
};

main()
