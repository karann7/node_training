// ========Dependencies========
const yargs   = require('yargs'),
	  geocode = require('./modules/geocode'),
	  weather = require('./modules/weather');

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

// takes the coordinates from the google api, and inputs them into the weather api.
geocode(argv.a, (err, results) => {
  if(err) {
	console.log(err);
  } else {
      weather(results.Latitude, results.Longitude, (err, weatherData)=> {
	     if(err){
		   console.log(err);
	     } else {
		  console.log(results.Address);
		  console.log(`It's currently ${weatherData.current}. It feels like ${weatherData.feelslike}.`);
	        }
		});
	}
});

