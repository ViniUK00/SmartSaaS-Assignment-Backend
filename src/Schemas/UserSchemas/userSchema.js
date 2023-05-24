const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        required:true
      },
    id: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  }
}, {timestamps:true});

const user = mongoose.model('users_data', userSchema);

module.exports = user;