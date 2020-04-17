const request = require("request");


const geocode = (address, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5kcmV3ZmVkYWsiLCJhIjoiY2s4eDY2cXpxMDM5dTNlbjU4OHplOWoxOSJ9.D-w8n8Sit0IICcBV22k2xQ&limit=1`;

    request({url, json: true}, (error, response) => {
        const {features} = response.body;      //!!!!! в response завжди є property BODY
        if(error){
            callback("Unable to connect to location services", undefined)
        } else if (features.length === 0){
            callback('Unable to find a location. Try another search', undefined);
        } else {
            const {center, place_name} = features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    });
};

module.exports = geocode;