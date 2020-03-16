// Arquivo construtor das instâncias de cada um dos restaurantes.
// São compostas de: nome, id, regex, gênero e horário de operações.

// A classe de restaurantes em si
class Restaurant {

	constructor(name, id, regex, gender, schedule) {

		this.name = name;
		this.id = id;
		this.regex = regex;
		this.gender = gender;
		this.schedule = schedule;

		this.lineClaimers = new Set();
	}

	addClaimer(id) {

		this.lineClaimers.add(id);
	}

	get lineClaims() {

		return this.lineClaimers.size;
	}
}

// Os horários de operação
class Schedule {

	// Cada property deve ser um obj do tipo {breakFast,lunch,dinner}
	constructor(workingDays, saturday, sunday) {
		this.workingDays = workingDays;
		this.saturday = saturday;
		this.sunday = sunday;
	}
}

/*************** As instâncias de horários ***************/

const centralSchedule = new Schedule(
	{
		breakfast: '7h às 8h30',
		lunch: '11h15 às 14h15',
		dinner: '17h30 às 19h45'
	},
	{
		breakfast: '7h30 às 9h',
		lunch: '11h15 às 14h15'
	}
);

const fisicaSchedule = new Schedule(
	{
		lunch: '11h15 às 14h15',
		dinner: '17h30 às 19h45'
	}
);

const prefeituraSchedule = new Schedule(
	{
		lunch: '11h às 14h',
	}
);

const quimicaSchedule = new Schedule(
	{
		lunch: '11h às 14h',
		dinner: '17h30 às 19h45'
	},
	null,
	{
		lunch: '11h15 às 14h15'
	}
);

const enfermagemSchedule = new Schedule(
	{
		lunch: '11h15 às 14h15'
	}
);

const eachSchedule = new Schedule(
	{
		lunch: '11h às 14h',
		dinner: '17h30 às 20h'
	}
);

const saudeSchedule = new Schedule(
	{
		lunch: '11h15 às 14h15',
		dinner: '17h30 às 19h'
	}
);


/*************** As instâncias de restaurantes ***************/

const central = new Restaurant(
	'Central',
	6,
	/centra[lu]/i,
	'o',
	centralSchedule
);

const prefeitura = new Restaurant(
	'Prefeitura',
	7,
	/prefeiturah?/i,
	'a',
	prefeituraSchedule
);

const fisica = new Restaurant(
	'Física',
	8,
	/f[íi][sz]i[ck]ah?/i,
	'a',
	fisicaSchedule
);

const quimica = new Restaurant(
	'Química',
	9,
	/(qu|k)[íi]mi[ck]ah?/i,
	'a',
	quimicaSchedule
);

const saude = new Restaurant(
	'Saúde Pública',
	11,
	/sa[úu]d[ei]( p[úu]bli[ck]ah?)?/i,
	'a',
	saudeSchedule
);

const enfermagem = new Restaurant(
	'Escola de Enfermagem',
	12,
	/([ei]s[ck]olah? de )?[ei]nferma[gj]ei?[nm]/i,
	'a',
	enfermagemSchedule
);

const each = new Restaurant(
	'EACH',
	13,
	/eachi?/i,
	'a',
	eachSchedule
);


module.exports = {
	central,
	prefeitura,
	fisica,
	quimica,
	saude,
	enfermagem,
	each
}
