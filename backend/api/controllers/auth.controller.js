const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

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
    next(error);
    // next(errorHandler(300, "Something went wrong"));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
