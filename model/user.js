const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Must Be Email Address"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
