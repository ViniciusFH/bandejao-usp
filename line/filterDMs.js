module.exports = (DMs) => {

	let nowTimeStamp = Date.now();

	let threeHours = 3 * 60 * 60 * 1000;

	return DMs
		// Filtra dms de três horas atrás.
		.filter(dm => nowTimeStamp - dm.created_timestamp < threeHours)
		// Filtra dms que possuam "fila" na mensagem.
		.filter(dm => /fila/i
		.test(dm.message_create.message_data.text));

};