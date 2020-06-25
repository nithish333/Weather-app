const request = require("request");

const geoCode = (address, callback) => {
  const mapBoxurl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoibml0aGlzaDAwMCIsImEiOiJja2JzNG5jcDYwMDQyMnBsYnhvM3Zja2x1In0.sPe1HYwVH7zLnTOLoc-KDQ&limit=1";
  request({ url: mapBoxurl, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Check your internet connection", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find the location.Check your location correctly..",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  geoCode,
};
