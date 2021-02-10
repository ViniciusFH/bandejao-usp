module.exports = reportedRestaurants => {

	let tweet = 'Alô! Parece que tá tendo muita fila ';

	for (let instance of reportedRestaurants) {

		let append =
			reportedRestaurants.indexOf(instance) === reportedRestaurants.length - 2
				? ' e '
				: ', ';  

		tweet += `n${instance.gender} ${instance.name}${append}`
	};

	tweet = tweet.trim()
		.replace(/,$/, '.');

	return tweet;
}