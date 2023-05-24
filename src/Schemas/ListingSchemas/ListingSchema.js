const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId, 
    required:true
  },
  listing_url: {type: String},
  name: {type: String},
  summary: {type: String},
  description: {type: String},
  access: {type: String},
  property_type: {type: String}
}, {timestamps:true});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;