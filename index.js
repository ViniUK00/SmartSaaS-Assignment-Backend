const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
require("dotenv").config();
const bodyParser = require('body-parser')
const app = express();

const indexRoutes = require("./src/Routes/indexRoutes");
const listingRoute = require("./src/Controllers/ListingCotrollers/ListingCotrollers/getListing")

//Body parser for JSON
app.use(express.json());
// app.use(bodyParser.json());

app.use(indexRoutes);
app.use(listingRoute);

const PORT = 3000;

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is Successfully Running and App is listening on port " + PORT);
  } else {
    console.log("Error occurred, server can't start ", error);
  }
});

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);