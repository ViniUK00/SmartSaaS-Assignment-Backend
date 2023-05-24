const express = require('express');
const router = express.Router();
const Listing = require('../../../Schemas/ListingSchemas/ListingSchema');


const getListing = async (req, res) => {
  try {
    const listings = await Listing.findOne({_id: "10057826"});
    console.log("This is from the server:",listings);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = getListing;