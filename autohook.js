const { Autohook } = require('twitter-autohook');
const getSubject = require('./DMSubject.js');
const lineHandler = require('./line/main.js');
const scheduleHandler = require('./schedule/main.js');
const keys = require('./api/client.js').config;


(async start => {
  
  try {

    const webhook = new Autohook();

    webhook.on('event', event => {

      console.log('Detectou evento.');

      if (event.direct_message_events) {

        console.log('Evento é DM.');

        let DMText = event.direct_message_events[0].message_create.message_data.text; 

        let DMSubject = getSubject(DMText);

        console.log(`Assunto da DM: ${DMSubject}`);

        let userID = event.direct_message_events[0].message_create.sender_id;

        if (DMSubject === 'schedule') {

          scheduleHandler(DMText, userID)

        }; 

        if (DMSubject === 'line') {

          lineHandler();

        };

      };

    })
    
    // Removes existing webhooks
    await webhook.removeWebhooks();
    
    // Starts a server and adds a new webhook
    await webhook.start();
    
    // Subscribes to your own user's activity
    await webhook.subscribe({oauth_token: keys.access_token, oauth_token_secret: keys.access_token_secret});



  } catch (e) {
    // Display the error and quit
    console.error(e);
    process.exit(1);
  }
})();