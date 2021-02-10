const twitterClient = require('../../client');

module.exports = (message, userID) => {

	return twitterClient.post('direct_messages/events/new', {

		event: {

			type: 'message_create',
			message_create: {
				target: {
					recipient_id: userID
				},
				message_data: {
					text: message
				}
			}
		}

	},
		(error, event) => {

			if (error) console.log(error);

			if (event) console.log('Enviou DM.');

	});

};