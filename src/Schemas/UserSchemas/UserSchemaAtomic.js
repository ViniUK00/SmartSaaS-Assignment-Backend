const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchemaAtomic = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    temp : {
      type: Number
    },
    weatherSet: {
            first_name: {
                type: String
            },
            last_name: {
                type: String
            },
            id: {
                type: String
            },
            weather: {
                type: String
            },
            avatar: {
                type: String
            },
            weatherIcon: {
                type: String
            },
            temp : {
              type: Number
            },
    },
    weatherPush: [{
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        id: {
            type: String
        },
        weather: {
            type: String
        },
        avatar: {
            type: String
        },
        weatherIcon: {
            type: String
        },
        temp : {
          type: Number
        },
    }],
});

const user = mongoose.model('user_data_atom', UserSchemaAtomic);

module.exports = user;
