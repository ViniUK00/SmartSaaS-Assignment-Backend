const express = require('express');
const router = express.Router();
const User = require('../../../Schemas/UserSchemas/UserSchemaAtomic');

const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const weatherCount = user.weatherPush.reduce((acc, curr) => {
            const weather = curr.weather;
            if (!acc[weather]) {
                acc[weather] = 0;
            }
            acc[weather]++;
            return acc;
        }, {});

        user._doc.weatherCount = weatherCount;

        res.status(200).json({ message: 'User retrieved successfully', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

module.exports = getUserById;
