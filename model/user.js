const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const userSchema = new mongoose.Schema({
 username: {
    type: String,
    required: true,
  
  },
  walletAddress: {
    type: String,
    required: true
  },
  balance: {type:Number,default:0},
  profit:{type:Number,default:0},
  upline:{type:String},
  uplinerTree: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  point:{type:Number,default:0},
  level : {type:Number,default:1,enum:[1,2,3,4,5]}
});
// Generate JWT token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id : user._id }, process.env.SECRETKEY, { expiresIn: '1h' });
    return token;
  };
module.exports = mongoose.model('User', userSchema);
