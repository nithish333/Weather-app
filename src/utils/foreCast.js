const request = require("request");

const foreCast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2c19793785ab5dcbf27d15a0d0d8e0b8&query=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Check your internet connection.", undefined);
    } else if (body.error) {
      callback("Please enter a valid location", undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        rainChance: body.current.precip,
      });
    }
  });
};

module.exports = {
  foreCast,
};
