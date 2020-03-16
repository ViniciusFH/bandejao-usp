const mealsRegex = {

	breakfast: /caf[ée]h?( da manh[ãa])?/i,
	lunch: /a[lu]mo(ç|ss)[ou]/i,
	dinner: /jantar?/i
};

module.exports = (text) => {

	return Object.keys(mealsRegex)

		.reduce((res, i) => {

			if (mealsRegex[i].test(text)) {

				res.push(i);

			};

			return res;


		}, [])
};
