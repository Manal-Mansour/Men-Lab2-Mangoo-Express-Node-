const mongoose = require("mongoose");
const User = require("../model/user");
const UTILITIES = require("../utilities/utility");

const getAllusers = async (requestAnimationFrame, res) => {
  const users = await User.find();
  res.json({ Status: UTILITIES.SUCESS, Data: users });
};

const register = async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.json({ MSG: "User is already exist " });
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.json({ Status: UTILITIES.SUCESS, Data: newUser });
  } catch (e) {
    return res.json(e.message);
  }
};

module.exports = { getAllusers, register };
