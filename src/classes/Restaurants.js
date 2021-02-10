// Arquivo construtor das instâncias de cada um dos restaurantes.
// São compostas de: nome, id, regex, gênero e horário de operações.

// A classe de restaurantes em si
class Restaurant {

	constructor({ name, id, regex, gender, schedule }) {

		this.name = name;
		this.id = id;
		this.regex = regex;
		this.gender = gender;
		this.schedule = schedule;

		this.lineReportersSet = new Set();
		this.isLineReportBlocked = false;
		
	}

	addLineReporter(id) {

		this.lineReportersSet.add(Date.now());
	}

	get lineReporters() {

		return this.lineReportersSet.size;
	}

	blockLineReport() {

		this.isLineReportBlocked = true;
	}

	clearReports() {

		this.lineReportersSet = new Set();
		this.isLineReportBlocked = false;
	}
}


const central = new Restaurant({
	name: 'Central',
	id: 6,
	regex: /centra[lu]/i,
	gender: 'o',
	schedule: {
		workingDays: {
			breakfast: '7h às 8h30',
			lunch: '11h15 às 14h15',
			dinner: '17h30 às 19h45'
		},
		saturday: {
			breakfast: '7h30 às 9h',
			lunch: '11h15 às 14h15'
		},
	},
});

const prefeitura = new Restaurant({
	name: 'Prefeitura',
	id: 7,
	regex: /prefeiturah?/i,
	gender: 'a',
	schedule: {
		workingDays: {
			lunch: '11h às 14h',
		}
	}
});

const fisica = new Restaurant({
	name: 'Física',
	id: 8,
	regex: /f[íi][sz]i[ck]ah?/i,
	gender: 'a',
	schedule: {
		workingDays: {
			lunch: '11h15 às 14h15',
			dinner: '17h30 às 19h45'
		},
	},
});

const quimica = new Restaurant({
	name: 'Química',
	id: 9,
	regex: /(qu|k)[íi]mi[ck]ah?/i,
	gender: 'a',
	schedule: {
		workingDays: {
			lunch: '11h às 14h',
			dinner: '17h30 às 19h45'
		},
		sunday: {
			lunch: '11h15 às 14h15'
		},
	}
});

const saude = new Restaurant({
	name: 'Saúde Pública',
	id: 11,
	regex: /sa[úu]d[ei]( p[úu]bli[ck]ah?)?/i,
	gender: 'a',
	schedule: {
		workingDays: {
			lunch: '11h15 às 14h15',
			dinner: '17h30 às 19h'
		}
	},
});

const enfermagem = new Restaurant({
	name: 'Escola de Enfermagem',
	id: 12,
	regex: /([ei]s[ck]olah? de )?[ei]nferma[gj]ei?[nm]/i,
	gender: 'a',
	schedule: {
		workingDays: {
			lunch: '11h15 às 14h15'
		}
	},
});

const each = new Restaurant({
	name: 'EACH',
	id: 13,
	regex: /eachi?/i,
	gender: 'a',
	schedule: {
		workingDays: {
			lunch: '11h às 14h',
			dinner: '17h30 às 20h'
		}
	},
});


module.exports = {
	central,
	prefeitura,
	fisica,
	quimica,
	saude,
	enfermagem,
	each
}
