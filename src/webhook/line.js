const detectRestaurants = require('../helpers/subjectDetectors/restaurants');
const createTweet       = require('../helpers/line/createTweet');
const sendDM            = require('../helpers/DM/send');

module.exports = (DMText, userId) => {

    // Detectamos os restaurantes que estão avisando sobre fila. 
    const reportedRestaurants = detectRestaurants(DMText);

    if (!reportedRestaurants.length) {

        console.log('Nenhum restaurante valido foi detectado.');

        return;
    };

    // Adicionamos um "claimer" a estes restaurante.
    reportedRestaurants.forEach(rest => rest.addLineReporter(userId));

    // Filtramos os que receberam muitos avisos, e não estão bloqueados.
    const restaurantsToReport = reportedRestaurants
        .filter(rest => rest.lineReporters > 3 && !rest.isLineReportBlocked);


    if (!restaurantsToReport.length) {

        console.log('Nenhum restaurante atingiu o mínimo de avisos sobre fila.');

        return;

    };

    // Agora criamos o tweet.
    const tweetText = createTweet(restaurantsToReport);
    // Postamos o tweet. 
    sendDM(tweetText, userId);

    // E bloqueamos os avisos para cada restaurante até a próxima refeição.
    restaurantsToReport.forEach(rest => rest.blockLineReport());

    return;
}