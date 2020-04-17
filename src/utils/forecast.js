const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=aaee407b4ae8b2280930c472aea11696&query=${latitude},${longitude}&units=d`;

        request({ url, json: true }, (error, response) => {
            const {error: bodyError, current} = response.body;
            if (error) {
                callback("Internet connection", undefined)
            } else if (bodyError) {
                callback("Undefined forecast for this are", undefined)
            } else {
                const {weather_descriptions, temperature, feelslike, cloudcover} = current;
                callback(undefined, `${weather_descriptions[0]} It is ${temperature} degrees outside and it feels like ${feelslike} degree; Cloud cover = ${cloudcover}`);
            }
        });
};

module.exports = forecast;