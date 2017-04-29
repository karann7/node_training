"use strict";
// ========Dependencies========
const geocode = require('./modules/geocode'),
 	  yargs   = require('yargs'),
 	  request = require('request');

// ========Dependencies========

// //takes arguments from the command line and put them into a property of the argv const.
// const argv = yargs
// 	.options({
// 		a: {
// 			demand: true,
// 			alias: 'address',
// 			describe: 'Adress to fetch weather for',
// 			string: true
// 		}
// 	})
// 	.help()
// 	.alias('help', 'h')
// 	.argv;

// // encodes plain addresses and then uses googlemaps geocode api to return value
// geocode(argv.a, (err, results) => {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(JSON.stringify(results, undefined, 2))
// 	}
// });

request({
	url: 'https://api.darksky.net/forecast/773faaffd661b32d6826175f5af0a813/40.7127837,-74.0059413',
	json: true
}, (err, res, body) => {
console.log(body.currently.temperature);
console.log(body.currently.apparentTemperature);
})