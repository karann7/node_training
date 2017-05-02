//////////////////
// Here Instead of using modules, we are using a library called axios which has
// support for promises and allows of HTTP requests.

"use strict";
// ========Dependencies========
const yargs   = require('yargs'),
	  axios   = require('axios');

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

const encodedURL = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`;

axios.get(geocodeUrl).then((res)=>{
	if(res.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find that address')
	} else {
		console.log(JSON.stringify(res.data.results[0].formatted_address));
		var lat = res.data.results[0].geometry.location.lat;
		var lng = res.data.results[0].geometry.location.lng;
		var weather = `https://api.darksky.net/forecast/773faaffd661b32d6826175f5af0a813/${lat},${lng}`;
		return axios.get(weather);
	}
}).then((res)=>{
	var temperature = res.data.currently.temperature;
	var feelslike   = res.data.currently.apparentTemperature;
	console.log(`Currently the temperature is: ${temperature}. It feels like ${feelslike}`);
}).catch((e)=>{
  if(e.code === 'ENOTFOUND'){
	console.log('Unable to connect to Google servers')
  } else {
	console.log(e.message)
	}
});
