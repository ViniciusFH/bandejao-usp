module.exports = (claimedRestaurants) => {

	let tweet = 'Alô! Parece que tá tendo muita fila ';

	for (let instance of claimedRestaurants) {

		let append =
			claimedRestaurants.indexOf(instance) === claimedRestaurants.length - 2
				? ' e '
				: ', ';  

		tweet += `n${instance.gender} ${instance.name}${append}`
	};

	tweet = tweet.trim()
		.replace(/,$/, '.');

	return tweet;
}