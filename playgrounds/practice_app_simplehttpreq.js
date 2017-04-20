//I have to use strict to be able to use ES6
"use strict";
// npm require is used to make a request to google maps apis
const request = require("request");

//the property json:true parses the data for readiblity. set json:false for complete tree.
request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=4300%20custis%20ave', 
    json: true
}, (error, response, body)=> {
  console.log(JSON.stringify(body, undefined, 2));
});