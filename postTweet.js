module.exports = function(payload){
	
	const Twitter = require('twitter');

	const client = new Twitter({
		consumer_key: 'xxxxxxxxxxxxxxxxxxx',
		consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		access_token_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
	});

	client.post('statuses/update', {status: payload},  function(error, tweet, response) {
		if(error) throw error;
	});

}