const jwt = require("jsonwebtoken");
const config = require('../config')

const getUserIdByToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded || !decoded.id) {
      throw new Error("Invalid token");
    }
    return decoded.id;
};


module.exports = {
    getUserIdByToken
}