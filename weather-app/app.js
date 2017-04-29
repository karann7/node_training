"use strict";
// ========Dependencies========
const geocode = require('./modules/geocode'),
 	  yargs   = require('yargs');

// ========Dependencies========

//takes arguments from the command line and put them into a property of the argv const.
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Adress to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

// encodes plain addresses and then uses googlemaps geocode api to return value
geocode(argv.a, (err, results) => {
	if(err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(results, undefined, 2))
	}
});