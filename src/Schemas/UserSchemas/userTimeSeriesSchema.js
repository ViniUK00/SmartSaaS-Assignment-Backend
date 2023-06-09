const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTimeSerriesSchema = new mongoose.Schema({
    id: { type: Number },
    lat: { type: Number},
    lng: { type: Number},
    weather: { type: String}
  }, { timestamps: true }, { metadata: true},
  );

  module.exports = userTimeSerriesSchema;