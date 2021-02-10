const { Autohook } 		= require('twitter-autohook');
const twitterConfig 	= require('../../config/twitter.config.json'); 
const detectSubject 	= require('../helpers/subjectDetectors/DMSubject');
const lineHandler 		= require('./line');
const scheduleHandler 	= require('./schedule');
const Restaurants 		= require('../classes/Restaurants');
const cron				= require('node-cron');

const webhook = new Autohook();

async function main() {

	try {

		webhook.on('event', event => {

			console.log('Detectou evento.');

			if (event.direct_message_events) {

				console.log('Evento é DM.');

				let DMText = event.direct_message_events[0].message_create.message_data.text; 

				let DMSubject = detectSubject(DMText);

				console.log(`Assunto da DM: ${DMSubject}`);

				let userId = event.direct_message_events[0].message_create.sender_id;

				if (DMSubject === 'schedule') {

					scheduleHandler(DMText, userId)

				}; 

				if (DMSubject === 'line') {

					lineHandler(DMText, userId);

				};

			};

		})

		await webhook.removeWebhooks();

		await webhook.start();

		await webhook.subscribe({

			oauth_token: twitterConfig.access_token,
			oauth_token_secret: twitterConfig.access_token_secret,

		});

	} catch (e) {
	
		console.error(e);
	
		process.exit(1);
	};

}

function clearReports () {
	Object.values(Restaurants)
			.forEach(rest => rest.clearReports());
}

// Os reports de fila devem ser zerados entre cada refeição.
// Os três horários abaixo estão entre as três refeições do bandejão.
cron.schedule('0 10 * * *', clearReports, { timezone: 'America/Sao_Paulo' }).start();
cron.schedule('0 16 * * *', clearReports, { timezone: 'America/Sao_Paulo' }).start();
cron.schedule('0 22 * * *', clearReports, { timezone: 'America/Sao_Paulo' }).start();

main();