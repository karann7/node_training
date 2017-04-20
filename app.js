//I have to use strict to be able to use ES6
"use strict";
// npm require is used to make a request to google maps apis
const request = require("request"),
      yargs   = require("yargs");
// yargs is taking the arguments from the Command Line and parsing through them
const argv = yargs
    .options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
// Encoding the input for URL
var encoded = encodeURIComponent(argv.address);
//the property json:true parses the data for readiblity. set json:false for complete tree.
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`, 
    json: true
}, (err, res, body)=> {
    if(err){
        console.log(err);
    } else {
  console.log(`Address: ${body.results[0].formatted_address} lat: ${body.results[0].geometry.location.lat} lng: ${body.results[0].geometry.location.lng}`
             );
    }
});