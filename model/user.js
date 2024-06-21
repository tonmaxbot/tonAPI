const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  telegramId: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  refferalEarnings: { type: Number, default: 0 },
  avaliableProfit: { type: Number, default: 0 },
  upline: { type: String, default: "Admin" },
  
  uplinerTree: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  invited_by:{type:String},
  point: { type: Number, default: 0 },
  level: { type: Number, default: 1, enum: [1, 2, 3, 4, 5, 6] },
  downliner1: {
    type: String,default:"Empty"
  },
  downliner2: {
    type: String,default:"Empty"
  }
}, { timestamps: true });

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
    expiresIn: "3d",
  });
  return token;
};
module.exports = mongoose.model("User", userSchema);
