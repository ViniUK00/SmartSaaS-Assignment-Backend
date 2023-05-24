const userDataValidate = (req, res, next) => {
    console.log("validateUserInput called");

    const { user, weather } = req.body;

    const { id, first_name, last_name, avatar, weatherIcon, temp } = user;
    const { weatherType } = weather;

    if (!req.body) {
      throw Error("Request body is required");
    }

    if (!id || !first_name || !last_name || !avatar || !weatherIcon || !temp) {
        console.log("Missing required user fields"); 
        return res.status(400).json({ error: 'Missing required user fields' });
    }

    if (weatherType) {
        console.log("Missing required weather field");  
        return res.status(400).json({ error: 'Missing required wearther field' });
    }

    console.log("User input is valid");
    next();
  };
  
  module.exports = { userDataValidate };
  