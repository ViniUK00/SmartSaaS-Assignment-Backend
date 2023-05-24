const express = require('express');
const router = express.Router();
const User = require('../../../Schemas/UserSchemas/UserSchemaAtomic');

const getUserAtomic = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ message: 'Users retrieved successfully', data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  
module.exports = getUserAtomic;