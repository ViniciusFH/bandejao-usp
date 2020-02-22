const client = require('./client.js');

const getLatestTweets = () => {
	
	return client.get('/statuses/user_timeline.json', {})

		.then(a => a)

		.catch(err => err)

};

module.exports = getLatestTweets;