const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrerTelegramId: {
    type: String,
    required: true,
  },
  referredByTelegramId: {
    type: String,
    required: true,
  },
  referralTimestamp: {
    type: Date,
    default: Date.now // Record the timestamp of the referral
  }
});

module.exports = mongoose.model('Referral', referralSchema);
