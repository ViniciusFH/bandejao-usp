const client = require('./client.js');

module.exports = (message, userID) => {

	client.post('direct_messages/events/new', {

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
		(error, event, response) => {

			if (error) console.log(error);

			if (event) console.log('Enviou DM.');

	});

};