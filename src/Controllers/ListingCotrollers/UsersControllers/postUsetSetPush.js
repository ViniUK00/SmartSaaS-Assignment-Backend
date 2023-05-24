const User = require('../../../Schemas/UserSchemas/UserSchemaAtomic');
const mongoose = require('mongoose');

const postUserAtomic = async (req, res) => {
    console.log("Process has started", req.body);

    const { user, weather } = req.body;
    const { id, first_name, last_name, avatar, weatherIcon, temp } = user;

    if (!user) {
        return res.status(400).json({ error: 'No user in request body' });
    }

    const updatedWeatherData = {
        first_name: first_name,
        last_name: last_name,
        id:id,
        weather:weather,
        avatar:avatar,
        weatherIcon:weatherIcon,
        temp:temp,
    };

    try {
        const foundUsers = await User.find({ id });

        if (foundUsers.length) {
            const foundUser = foundUsers[0];

            if (foundUser.weatherSet.weather !== updatedWeatherData.weather) {
                foundUser.weatherSet = updatedWeatherData;
                foundUser.weatherPush.push(updatedWeatherData);
                await foundUser.save();
                return res.status(200).json({ message: 'Data successfully updated', data: foundUser });
            } else {
                return res.status(200).json({ message: 'Weather data is the same, no update needed', data: foundUser });
            }
        } else {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId,
                first_name: first_name,
                last_name: last_name,
                id:id,
                weather:weather,
                avatar:avatar,
                weatherIcon:weatherIcon,
                temp:temp,
                weatherPush: [updatedWeatherData],
                weatherSet: updatedWeatherData,
            });

            await newUser.save();
            return res.status(200).json({ message: 'Data successfully uploaded', data: newUser });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Could not update user data' });
    }
}

module.exports = postUserAtomic;
