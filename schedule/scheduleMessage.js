const mealName = {

	breakfast: 'café da manhã',
	lunch: 'almoço',
	dinner: 'jantar'
};

const dayName = {
	workingDays: 'Dia de semana',
	saturday: 'Aos sábados',
	sunday: 'Aos domingos'
};

module.exports = (rest, meals, days) => {

	let message = '';

	let daysOff = [];

	let informName = true;

	if (days.indexOf('workingDays') === -1) {

		for (let day of days) {

			if (!rest.schedule[day]) {

				daysOff.push(day);
			};

		};

		if (daysOff.length) {

			if (daysOff.length > 1) {

				message += `${rest.gender.toUpperCase()} ${rest.name} não funciona aos fins de semana :/. `;

			} else {

				message += `${rest.gender.toUpperCase()} ${rest.name} não funciona ${dayName[daysOff[0]].toLowerCase()} :/. `;

				informName = false;

			};

		};

	};

	if (daysOff.length === days.length) return message;

	days = days.filter(day => daysOff.indexOf(day) === -1);

	for (let day of days) {

		let mealsOff = [];

		for (let meal of meals) {

			if (!rest.schedule[day][meal]) {

				mealsOff.push(meal);

			};

		};

		let start = informName ? `${dayName[day]}, ${rest.gender} ${rest.name} não tem ` : `${dayName[day]} não tem `;

		if (mealsOff.length) {

			message += mealsOff.reduce((msg, item, i) => {

				let append = ',';

				if (mealsOff.length - 2 === i) append = ' nem ';
				if (mealsOff.length - 1 === i) append = '. ';

				return msg + mealName[item] + append;


			}, start)

			informName = false;

		};

		meals = meals.filter(meal => mealsOff.indexOf(meal) === -1);

		if (!meals.length) return message;

		start = informName ? `N${rest.gender} ${rest.name}, o ` : 'O ';

		message += meals.reduce((msg, meal, i) => {

			let append = ', o ';

			if (meals.length - 2 === i) append = ' e o ';
			if (meals.length - 1 === i) append = '.';

			if (i === 0) {

				return msg + mealName[meal] + ` vai das ${rest.schedule[day][meal]}${append}`;

			};

			return msg + mealName[meal] + ` das ${rest.schedule[day][meal]}${append}`;

		}, start)

	};

	return message;
};
