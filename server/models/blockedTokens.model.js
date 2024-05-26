const mongoose = require('mongoose');

const blockedTokensSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('BlockedToken', blockedTokensSchema);