const Weather = require('../../Schemas/WeatherSchemas/weatherSchema');

const periods = {
    minutely: 60 * 1000,
    hourly: 60 * 60 * 1000,     
    daily: 24 * 60 * 60 * 1000, 
  };

const getIdWithMostWeatherPosts = async (weatherType, timestamp) => {
  const result = await Weather.aggregate([
    { $unwind: "$current.weather" },
    { $match: { "current.weather.main": weatherType ,
                "createdAt": { $gte: new Date(timestamp) }} },
    { $group: { _id: "$id", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);
  return result;
}

const getWeatherMostPosts = async (req, res) => {
    const weatherType = req.query.type;
    const period = periods[req.query.period];
    const timestamp = new Date(Date.now() - period);
    
    if (!weatherType) {
      return res.status(400).send('Missing weather type');
    }
    
    try {
      const result = await getIdWithMostWeatherPosts(weatherType,timestamp);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  };
  
module.exports = getWeatherMostPosts;
