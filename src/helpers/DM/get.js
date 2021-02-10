const twitterClient = require('../../client');

const getDMs = () => {
	
	return new Promise((resolve, reject) => {

		twitterClient.get('/direct_messages/events/list', {}, (err, data, response) => {

			if (err) return resolve(null);

			if (!data.events) return resolve(null);

			return resolve(data.events);

		})

	})

};

module.exports = getDMs;