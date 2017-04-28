"use strict";

const request = require('request'),
 	  yargs   = require('yargs');

// Makes a request to the google api and returns specific parts.
request({
  url:'https://maps.googleapis.com/maps/api/geocode/json?address=4300%20custis%20ave',
  json: true
}, (err, res, body) => {
  if(!err && res.statusCode === 200 ) {
  	console.log(`Address: ${body.results[0].formatted_address}`);
  	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  	console.log(`Longitude: ${body.results[0].geometry.location.lng}` );
  } else {
  	console.log(res.statusCode);
  } 
});

