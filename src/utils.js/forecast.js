const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a9e1e95c9fce5825787b313618e91396&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const { current } = body;
      //console.log(`It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out`);
      //callback(undefined,{ Teperature:current.temperature, Feelslike: current.feelslike});
      callback(
        undefined,
        `It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
