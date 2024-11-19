const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

const register = async (req, res, next) => {

  //get the request info from the client side
  const { username, email, password } = req.body;

  //hashing password before sending to the database
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // created a new user using User model
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    // next(error);
    next(errorHandler(300, "Something went wrong"));
  }
};

module.exports = {
  register,
};
