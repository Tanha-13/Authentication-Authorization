

const express = require("express");
const app = express();
// global middleware for parsing JSON requests
app.use(express.json());

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

  // user routes
  const userRoutes = require('./routes/user.route');
  app.use("/api/user", userRoutes);

  // creating auth routes
  const authRoutes = require('./routes/auth.route');
  app.use('/api/auth', authRoutes);


// error middleware
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})



  app.listen(3000, () => {
    console.log("Server is running on 3000");
  });