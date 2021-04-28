const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');

//Calling function using callback chaining

const location = process.argv[2]; //Getting location data from command line argument using argv
if (!location) {
  return console.log(chalk.red("Please provide a location. Program will quit now"));

} else {
  geocode(location, (error, data) => {

    if (error) {
      return console.log(error);
    }

    forecast(data.lattitude, data.longitude, (error, forecastData) => {

      console.log(forecastData);

    })
  })

}
