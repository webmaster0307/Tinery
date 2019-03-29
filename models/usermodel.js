const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  avatar: {
    type: String
  },
  country: {
    type: String
  },
  googleID: {
    type: String,
    default: null
  },
  facebookID: {
    type: String,
    default: null
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: Array
  }
});

module.exports = mongoose.model("users", UserSchema);
