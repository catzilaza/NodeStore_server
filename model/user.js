const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: false,
    unique: false,
  },
  username: {
    type: String,
    required: false,
    unique: false,
  },
  firstname: {
    type: String,
    required: false,
    unique: false,
  },
  lastname: {
    type: String,
    required: false,
    unique: false,
  },
  telephone: {
    type: String,
    required: false,
    unique: false,
  },
  address: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  img: {
    data: Buffer,
    contentType: String,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);