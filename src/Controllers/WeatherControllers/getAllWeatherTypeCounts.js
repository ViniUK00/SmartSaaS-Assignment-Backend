const User = require('../../Schemas/UserSchemas/UserSchemaAtomic');

const getAllWeatherTypeCounts = async (req, res) => {
    User.aggregate([
        { $unwind: "$weatherPush" },
        { $group: { _id: { first_name: "$first_name", weather: "$weatherPush.weather" }, count: { $sum: 1 } } },
        { $group: { _id: "$_id.first_name", weatherCounts: { $push: { weather: "$_id.weather", count: "$count" } } } },
        { $project: {
            _id: 0,
            first_name: "$_id",
            weatherCounts: { $arrayToObject: { $map: { input: "$weatherCounts", as: "wc", in: [ "$$wc.weather", "$$wc.count" ] } } }
        } }
    ]).then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
}

module.exports = getAllWeatherTypeCounts;

