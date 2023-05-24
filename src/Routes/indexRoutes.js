const express = require('express');
const router = express.Router();
const postListing = require('../Controllers/ListingCotrollers/ListingCotrollers/postListing');
const getListing = require('../Controllers/ListingCotrollers/ListingCotrollers/getListing');
const postUser = require('../Controllers/ListingCotrollers/UsersControllers/postUser');
const postUserAtomic = require('../Controllers/ListingCotrollers/UsersControllers/postUsetSetPush');
const getUserAtomic = require('../Controllers/ListingCotrollers/UsersControllers/getUserAtomic');
const postUserSearch = require('../Controllers/SearchUser/postUserSearch');
const {userDataValidate} = require('../Controllers/validations/user.validation');
const postWeather = require('../Controllers/WeatherControllers/postWeather');
const getWeatherMostPosts = require('..//Controllers/WeatherControllers/getWeatherMostPosts');
const getUserById = require('../Controllers/ListingCotrollers/UsersControllers/getUserById');
const getAllWeatherTypeCounts = require('../Controllers/WeatherControllers/getAllWeatherTypeCounts');


router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.get("/listing", getListing);

router.post('/post-listing', postListing);

router.post('/post-user', postUser)

router.post('/post-user-atom', userDataValidate, postUserAtomic);

router.get('/get-user-atomic', getUserAtomic);

router.post('/search', postUserSearch);
  
router.post('/post-weather', postWeather);

router.get('/weather/most-posts', getWeatherMostPosts)

router.get('/users/:id', getUserById);

router.get('/weather/getAllWeatherTypePostCount', getAllWeatherTypeCounts);

module.exports = router;