const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicnVpemwiLCJhIjoiY2tpdW02bXBqMGl5dTJzcGZneXUzaG43ZiJ9.ZeEPgKy4r1e1ESiAd1uBCw&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const [longitude, latitude] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

// geoCode ('Las Vegas', (error,data) => {
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log(`${data.location} has a Latitude of ${data.latitude} and Longitude of ${data.longitude}`);
//     }
// })

module.exports = geoCode;
