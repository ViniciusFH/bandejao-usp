const daysRegex = {

	weekend: /fi(m|na(l|is)|ns) d[eai] semanas?|fds/i,
	saturday: /s[áa]bad[ou]s?/i,
	sunday: /d[ou]ming[ou]s?/i
};

module.exports = (text) => {

	let res = [];

	if (daysRegex.saturday.test(text)) {
		res.push('saturday');
	};

	if (daysRegex.sunday.test(text)) {
		res.push('sunday');
	};

	if (!res.length &&
		daysRegex.weekend.test(text)) {
		res.push('saturday', 'sunday');
	};

	return res;
};
