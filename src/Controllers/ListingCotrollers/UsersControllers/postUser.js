const User = require('../../../Schemas/UserSchemas/userSchema');
const mongoose = require('mongoose');

const postUser = async (req, res) => {
    console.log("Process has started", req.body);

    const { user } = req.body;
    const { id, first_name, last_name } = user;

    if(!user){
        return res.status(400).json({
            error: 'No user in request body'
        })
    }

    const newUser = new User({ 
        _id: new mongoose.Types.ObjectId,
        id: id,
        first_name: first_name,
        last_name: last_name
    });

    newUser.save()
    .then(user => {
        return res.status(200).json({message: 'Data successfully uploaded', data: user})
    })
    .catch(e => {
        console.error(e)
        return res.status(500).json({error: 'Could not save your new user'})
    })
}
module.exports= postUser;
