"use strict";
const request = require('request');

var weather = (lat, lng, callback) => {
  request({
	  url: `https://api.darksky.net/forecast/773faaffd661b32d6826175f5af0a813/${lat},${lng}`,
	  json: true
       }, (err, res, body) => {
	 if(!err && res.statusCode === 200){
	 	callback(undefined, {
			current: body.currently.temperature,
			feelslike: body.currently.apparentTemperature
			});
		} else {
		callback('Unable to fetch weather.');
	 } 
    });
}

module.exports = weather;