const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {type: String},
    lat: {type: Number},
    lon:{type: Number},
    timezone: {type: String},
    timezone_offset: {type: Number},
    current: {
        dt: {type: Number},
        temp: {type: Number},
        feels_like: {type: Number},
        humidity: {type: Number},
        uvi: {type: Number},
        wind_speed: {type: String},
        pressure: {type: String},
        weather: [
            {
                main: {type: String},
                description: {type: String},
                icon: {type: String},
            }
        ]
    }
},{timestamps:true});

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;