const Weather = require('../../Schemas/WeatherSchemas/weatherSchema')
const mongoose = require('mongoose');

const postWeather = async (req, res) => {
    console.log("Process has started", req.body);

    const { id, lat, lon, timezone, timezone_offset, current } = req.body;
    const { dt, temp, feels_like, humidity, uvi, wind_speed, pressure, weather } = current;
    const [{main, description, icon}] = weather

    if(!lat || !lon || !timezone || !timezone_offset || !current){
        return res.status(400).json({
            error: 'Missing properties in request body'
        }) 
    }

    const newWeather = new Weather({
        _id: new mongoose.Types.ObjectId(),
        id: id,
        lat: lat,
        lon: lon,
        timezone: timezone, 
        timezone_offset: timezone_offset,
        current: {
            dt: dt,
            temp: temp,
            feels_like: feels_like,
            humidity: humidity,
            uvi: uvi,
            wind_speed: wind_speed,
            pressure: pressure,
            weather: weather
        }
    });

    newWeather.save()
    .then(weather => {
        return res.status(200).json({message: 'Data successfully uploaded', data: weather})
    })
    .catch(e => {
        console.error(e)
        return res.status(500).json({error: 'Could not save your new weather'})
    })     
}
module.exports= postWeather;
