const User = require('../model/user'); // Assuming your user model is in user.model.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); 

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY); 
    const userId = decoded._id;

    const user = await User.findById(userId); 

    if (!user) {
      throw new Error(); 
    }

    req.user = user; 
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' }); 
  }
};

module.exports = auth;
