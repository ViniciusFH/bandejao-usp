const client = require('./client.js');

module.exports = function(payload){

	client.post('statuses/update', {status: payload}, (error, tweet, response) => {
		if (error) console.log(error);
	});

};