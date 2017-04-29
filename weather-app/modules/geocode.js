"use strict";

const request = require('request');

var geocodeAddress = (address, callback) => {

const encodedURL = encodeURIComponent(address);

	// Makes a request to the google api and returns specific parts.
	request({
	  url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`,
	  json: true
	 }, (err, res, body) => {
		 	if(err){
		 		callback('Unable to connect to Google servers');
		 	} else if(body.status === 'ZERO_RESULTS') {
		 		callback('Unable to find the Address provided');
		 	} else if(body.status === "OK"){
		 		callback(undefined, {
	 		    Address: body.results[0].formatted_address,
		  	    Latitude: body.results[0].geometry.location.lat,
		  	    Longitude: body.results[0].geometry.location.lng
		 		})
	 	 }
	});
};

module.exports = geocodeAddress;