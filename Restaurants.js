class Restaurant {

	constructor(name, id, regex, gender) {

		this.name = name
		this.id = id;
		this.regex = regex;
		this.gender = gender;

		this.lineClaimers = new Set();
	}

	addClaimer(id) {

		this.lineClaimers.add(id)
	}

	get lineClaims() {

		return this.lineClaimers.size;
	}
}

const central = new Restaurant('Central', 6, /centra[lu]/i, 'o');
const prefeitura = new Restaurant('Prefeitura', 7, /prefeiturah?/i, 'a');
const fisica = new Restaurant('Física', 8, /f[íi][sz]i[ck]ah?/i, 'a');
const quimica = new Restaurant('Química', 9, /(qu|k)[íi]mi[ck]ah?/i, 'a');
const saude = new Restaurant('Saúde Pública', 11, /sa[úu]d[ei]( p[úu]bli[ck]ah?)?/i, 'a');
const enfermagem = new Restaurant('Escola de Enfermagem', 12, /([ei]s[ck]olah? de )?[ei]nferma[gj]ei?[nm]/i, 'a');
const each = new Restaurant('EACH', 13, /eachi?/i, 'a');


module.exports = {
	central,
	prefeitura,
	fisica,
	quimica,
	saude,
	enfermagem,
	each
}