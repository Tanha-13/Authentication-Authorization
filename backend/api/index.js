

const express = require("express");
const app = express();

// environment variable setup
const dotenv = require("dotenv");
dotenv.config();


//connected database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log(`The error is ${error}`);
  });

  // using api
  const userRoutes = require('./routes/user.route');
  app.use("/api/user", userRoutes);






  app.listen(3000, () => {
    console.log("Server is running on 3000");
  });