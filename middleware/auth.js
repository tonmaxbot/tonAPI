const User = require('../model/user'); // Assuming your user model is in user.model.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Extract token from header

    if (!token) {
      return res.status(401).json({ message: 'No token provided' }); // Handle missing token
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY); // Verify the token
    const userId = decoded._id; // Extract user ID from payload

    const user = await User.findById(userId); // Find user by ID

    if (!user) {
      throw new Error(); // Handle invalid token (user not found)
    }

    req.user = user; // Attach user object to the request
    next(); // Continue processing the request
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' }); // Unauthorized
  }
};

module.exports = auth;
