const axios = require('axios');

module.exports = id => {

	const config = {
		method: 'post',
		url: 'https://uspdigital.usp.br/rucard/dwr/call/plaincall/CardapioControleDWR.obterCardapioRestUSP.dwr',
		data: 	`callCount=1
				windowName=
				c0-scriptName=CardapioControleDWR
				c0-methodName=obterCardapioRestUSP
				c0-id=0
				c0-param0=string:${id}
				batchId=1
				instanceId=0
				page=%2Frucard%2FJsp%2FcardapioSAS.jsp%3Fcodrtn%3D6
				scriptSessionId=nEoiNajCiU28XirOny13QEf$3Sm/n2G14Sm-qLFT$irJu`.replace(/[ \t]/g, ''),
	};

	return axios(config)

		.then(response => response.data);

}