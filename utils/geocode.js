const request = require("request");
const chalk = require("chalk");

const geocode = (address, callback) => {

  const url_geomap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FnYXJ0aG9yYXQiLCJhIjoiY2tuemh1MWI4MDU0ZTJ3dGR6NXRqZjhwbiJ9.NCegOdMl19E2JjED0uW_dQ&limit=1%27';
  //console.log(url_geomap);
  request({
    url: url_geomap,
    json: true
  }, (error, response) => {

    if (error) {

      //calling the geocode callback function here passing error message (error,data)
      callback(chalk.red('Unable to connect to location Services'), undefined)
    } else if (response.body.features.length == 0) {

      //calling the geocode callback function here passing error message (error,data)
      callback(chalk.red('Unable to find the location Services'), undefined)
    } else {

      //no error to pass but passing data to callback using object
      callback(undefined, {

        lattitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })

    }

  })

}


//exporting the geocode function
module.exports = geocode;