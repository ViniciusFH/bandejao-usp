const client = require('./client.js');

const getDMs = () => {
	
	return client.get('/direct_messages/events/list.json', {})

		.then(list => list.events)

		.catch(err => [])

};

module.exports = getDMs;