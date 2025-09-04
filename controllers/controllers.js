const Course = require("../model/model");
const UTILITIES = require("../utilities/utility");

const getAllCourses = async (req, res) => {
  console.log(req.query);
  const limit = parseInt(req.query.limit) || 2;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find().limit(limit).skip(skip);
  res.json({ Status: "SUCESS", Data: courses });
};

const addnewCourse = async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json({ Status: UTILITIES.SUCESS, Data: newCourse });
};

const getSingleCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json({ Status: UTILITIES.SUCESS, Date: course });
};

const updateCourse = async (req, res) => {
  const id = req.params.id;
  const course = await Course.updateOne({ _id: id }, { $set: { ...req.body } });
  res.json({ Status: UTILITIES.SUCESS, data: course });
};

const deleteCourse = async (req, res) => {
  const id = req.body.params;
  const deletedCourse = await Course.deleteOne({ _id: id });
  res.json({
    Status: UTILITIES.SUCESS,
    Msg: "Delete the course ",
    data: deletedCourse,
  });
};

const getFailed = (req, res) => {
  res.json({ Status: UTILITIES.Fail, MSG: "Not FOund" });
};
module.exports = {
  getAllCourses,
  addnewCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getFailed,
};
