module.exports = (DMText) => {

	if (/fila/i.test(DMText)) return 'line';

	if (/hor(a|ário)s?/i.test(DMText)) return 'schedule';

	return 'other';
};