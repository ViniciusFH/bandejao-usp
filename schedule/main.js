const whichRestaurants = require('./whichRestaurants');
const whichMeals = require('./whichMeals');
const whichDays = require('./whichDays');
const scheduleMessage = require('./scheduleMessage');
const sendDM = require('../api/sendDM');
const restaurants = require('../Restaurants');

module.exports = (DMText, userID) => {

	// Extraimos da DM os restaurantes
	const inteRest = whichRestaurants(DMText);

	// Precisamos de ao menos um restaurante.
	if (!inteRest.length) {

		sendDM('Por favor, seja mais específico :)', userID);

		return;
	};

	// Extraímos da DM as refeições
	let inteMeals = whichMeals(DMText);

	// Se o usuário não especifica uma refeição, informamos todas daquele restaurante
	if (!inteMeals.length) {

		inteMeals = ['breakfast', 'lunch', 'dinner'];
	}

	let inteDays = whichDays(DMText);

	// Se o usuário não especifica um dia, informamos os horários dos dias de semana
	if (!inteDays.length) {

		inteDays = ['workingDays'];
	};

	let DMAnswer = scheduleMessage(inteRest[0], inteMeals, inteDays);

	sendDM(DMAnswer, userID);

	return;

};

