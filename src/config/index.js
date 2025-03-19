require('dotenv').config();



const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
