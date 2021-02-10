const restaurants = require('../../classes/Restaurants');

module.exports = (text) => {

	return Object.keys(restaurants)

		.reduce((res, i) => {

			if (restaurants[i].regex.test(text)) {

				res.push(restaurants[i]);

			};

			return res;

		}, [])
};