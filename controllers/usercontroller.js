const mongoose = require("mongoose");
const User = require("../model/user");
const UTILITIES = require("../utilities/utility");

const getAllusers = async (requestAnimationFrame, res) => {
  const users = await User.find();
  res.json({ Status: UTILITIES.SUCESS, Data: users });
};

const addNewUser = async (req, res) => {
  const newUser = new User(req.body);
  newUser.save();
  res.json({ Status: UTILITIES.SUCESS, Data: newUser });
};

module.exports = { getAllusers, addNewUser };
