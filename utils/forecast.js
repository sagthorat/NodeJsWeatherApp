const request = require("request");
const chalk = require('chalk');

const forecast = (alt, long, callback) => {

    const url_forecast = 'http://api.weatherstack.com/current?access_key=ff823831ba5d50c95016c10a787ffa3b&query=' + alt + ',' + long + '&units=m';
    request({
        url: url_forecast,
        json: true
    }, (error, response) => {

        if (error) {

            //calling the geocode callback function here passing error message (error,data)
            callback(chalk.red('Unable to connect to weather Services'), undefined)
        } else if (response.body.error) {

            //calling the geocode callback function here passing error message (error,data)
            
            callback(chalk.red('Request failed with error code: ' + response.body.error.code + '.' + response.body.error.info), undefined)
        } else {

            const data = response.body.current;

            //const data = JSON.parse(response.body); json:true is already parsing body in json

            callback(undefined, chalk.green("The weather in " + chalk.yellowBright(response.body.location.name) + ' is ' +  chalk.yellowBright(data.weather_descriptions[0]) + " with temprature: " + chalk.redBright(data.temperature) + " degrees Celcius"))

        }

    })

}


//exporting the geocode function
module.exports = forecast;