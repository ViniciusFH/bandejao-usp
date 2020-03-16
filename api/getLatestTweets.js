const client = require('./client.js');

const getLatestTweets = () => {
	
	return new Promise((resolve, reject) => {

		client.get('/statuses/user_timeline', {}, (err, data, response) => {

			if (err) return resolve(null);

			return resolve(data);

		})

	}) 

};

module.exports = getLatestTweets;