const mongoose = require("mongoose");
const User = require("../model/user");
const UTILITIES = require("../utilities/utility");
const bcrypt = require("bcryptjs");

const getAllusers = async (req, res) => {
  const users = await User.find({}, { __V: 0 });
  res.json({ Status: UTILITIES.SUCESS, Data: users });
};

const register = async (req, res) => {
  const { firstName, email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.json({ MSG: "User Already Found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, email, password: hashedPassword });
    await newUser.save();
    return res.json(newUser);
  } catch (e) {
    return res.json(e.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const checkedPassword = await bcrypt.compare(password, user.password);
    if (user && checkedPassword) {
      return res.json({ status: UTILITIES.SUCESS, data: "Login True" });
    } else {
      return res.json({ MSG: "Wrong Credential" });
    }
  } catch (e) {
    return res.json(e.message);
  }
};

module.exports = { getAllusers, register, login };
