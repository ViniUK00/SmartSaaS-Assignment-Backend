const Listing = require('../../../Schemas/ListingSchemas/ListingSchema');
const mongoose = require('mongoose');

const postListing = async ( req,res ) => {
    console.log("Proccess has started", req.body);

    const { listing} = req.body;
const {property_type,listing_url} = listing;

if(!listing){
    return res.status(400).json({
        errror: 'No listing in request body'
    })
}
   const newListing = new Listing({
    _id: new mongoose.Types.ObjectId,
        property_type: property_type,
        listing_url: listing_url
    })
    newListing.save()
    .then(listing => {
        return res.status(200).json({message: 'Data succesfully uploaded', data: listing})
    })
    .catch(e => {
        console.error(e)
        return res.status(500).json({error: 'Could not save your new listing'})
    })
    
}
module.exports= postListing;