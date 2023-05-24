const express = require('express');
const mongoose = require('mongoose');
const User = require('../../../src/Schemas/UserSchemas/UserSchemaAtomic');

const postUserSearch = async (req, res) => {
    const searchText = req.body.searchText;
    const regex = new RegExp(searchText, 'i');
  
    try {
      const results = await User.find({
        $or: [
          { first_name: { $regex: regex } },
          { last_name: { $regex: regex } },
          {
            weatherPush: {
              $elemMatch: {
                weather: { $regex: regex },
              },
            },
            }
        ],
      });
      res.status(200).json(results);
    } catch (error) {
      console.error('Error searching users', error);
      res.status(500).json({ error: 'Could not search users' });
    }
  }

  module.exports = postUserSearch;
