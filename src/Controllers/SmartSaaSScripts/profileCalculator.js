const express = require("express");
const mongoose = require("mongoose");
const { UserModel, UserProfileSchema } = require("../../schema/User");
const isEmpty = require("is-empty");

/* This GET request begins by finding a user in the database based on the ID passed in the request parameters. If the user is found, function checks if the user has any incomplete fields in their profile. If any incomplete fields are found, it appends it into an array (emptyFields) till the loop stop and the it returns an object with the array and the length of the array, If all fields complete it returns an object saying that is completed. */

const profileCalculator = async (req, res) => {
  // initialise emptyFields array and user
  let emptyFields = [];
  let user;
  const initialSchema = UserProfileSchema.schema.obj;
  console.log(initialSchema);

  // tries to find the user by id which is passed in the req.params
  try {
    user = await UserModel.findById(
      req.params.id
    ); /* !! What happens if there is no id? */
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({
        error: "Server error",
      }); /* !! Server response too generic, we need to identify the source of th problem */
  }

  for (let prop in initialSchema) {
    emptyFields.push(prop);
  }

  // loops through the object and finds all empty fields and appends into the emptyFields array
  //Nested loops are bad !! but in this case we have a finite set to loop through (i.e. the max nested value is length of the schema which is ~10 and not a variable nor dynamic value, so its acceptable)
  for (let prop in user.profile_information._doc) {
    /* !! Server response too generic, we need to identify the source */
    if (
      isEmpty(user.profile_information._doc[prop]) &&
      !emptyFields.includes(prop)
    ) {
      emptyFields.push(prop);
    } else if (
      !isEmpty(user.profile_information._doc[prop]) &&
      emptyFields.includes(prop)
    ) {
      for (var i = 0; i < emptyFields.length; i++) {
        if (emptyFields[i] === prop) {
          emptyFields.splice(i, 1);
        }
      }
    }
  }

  // Depending on the emptyFields it will have different responses
  if (emptyFields) {
    res.json({
      completed: false,
      emptyFields: emptyFields,
      emptyFieldsCount: emptyFields.length,
    });
  }

  if (!emptyFields) {
    res.json({ completed: true });
  }
};

module.exports = profileCalculator;
