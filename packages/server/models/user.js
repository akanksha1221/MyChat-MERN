const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passhash: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
