const client = require('../../client.js');

module.exports = payload => {

	return client.post('statuses/update', {
		
		status: payload
	
	}, (error) => {

		if (error) console.log(error);
	
	});

};