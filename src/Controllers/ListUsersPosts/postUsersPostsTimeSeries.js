const userTimeSerriesSchema = require('../../Schemas/UserSchemas/userTimeSeriesSchema');
const mongoose = require('mongoose');

const TimeSeries = mongoose.model('TimeSeries', userTimeSerriesSchema);

const postUserTimeSeries = async (req, res) => {
  try {
    const data = req.body;

    const newUserData = data.map(item => ({ ...item, createdAt: new Date(), updatedAt: new Date() }))

    const insertedData = await TimeSeries.insertMany(newUserData)

    console.log('Data stored successfully:', insertedData);
    return res.status(200).json({ message: 'Data succesfully uploaded', data: insertedData });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ message: 'Could not save your new user' }); 
  }
};

module.exports = postUserTimeSeries;