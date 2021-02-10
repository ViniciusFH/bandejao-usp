const detectRestaurants = require('../helpers/subjectDetectors/restaurants');
const detectMeals = require('../helpers/subjectDetectors/meals');
const detectDaysOfTheWeek = require('../helpers/subjectDetectors/daysOfTheWeek');
const createMessage = require('../helpers/schedule/createMessage');
const sendDM = require('../helpers/DM/send');

module.exports = (DMText, userID) => {

	// Extraimos da DM os restaurantes
	const inteRest = detectRestaurants(DMText);

	// Precisamos de ao menos um restaurante.
	if (!inteRest.length) {

		sendDM('Por favor, seja mais específico :)', userID);

		return;
	};

	// Extraímos da DM as refeições
	let inteMeals = detectMeals(DMText);

	// Se o usuário não especifica uma refeição, informamos todas daquele restaurante
	if (!inteMeals.length) {

		inteMeals = ['breakfast', 'lunch', 'dinner'];
	}

	let inteDays = detectDaysOfTheWeek(DMText);

	// Se o usuário não especifica um dia, informamos os horários dos dias de semana
	if (!inteDays.length) {

		inteDays = ['workingDays'];
	};

	let DMAnswer = createMessage(inteRest[0], inteMeals, inteDays);

	sendDM(DMAnswer, userID);

	return;

};

