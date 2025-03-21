require('dotenv').config();


const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
