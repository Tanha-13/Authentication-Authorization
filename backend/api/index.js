const express = require("express");
const app = express();

//
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log(`The error is ${error}`);
  });

  

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
