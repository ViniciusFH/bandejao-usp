const restaurant = require('../Restaurants.js');

module.exports = (validDMs) => {

	// Quantidade mínima de pessoas avisando que há fila para postarmos o tweet.
	const minimumClaimers = 5;

	for (let dm of validDMs) {
		// Para cada uma das DMs filtradas...
		for (let rest of Object.keys(restaurant)) {
			// Testamos cada um dos regex de restaurantes...
			if (restaurant[rest].regex.test(dm.message_create.message_data.text)) {
				// E adicionamos um "claimer" (pessoa dizendo que aquele restaurante está com fila).
				restaurant[rest].addClaimer(dm.message_create.sender_id);
			};
		};
	};

	let claimedRestaurants = [];

	// Para cada restaurante...
	for (let instance of Object.keys(restaurant)) {
		// Se há a quantidade mínima de claims de fila para aquele restaurante...
		if (restaurant[instance].lineClaims >= minimumClaimers) {
			// Adicionamos ao array de restaurantes com fila
			claimedRestaurants.push(restaurant[instance]);
		};
	};

	return claimedRestaurants;

};