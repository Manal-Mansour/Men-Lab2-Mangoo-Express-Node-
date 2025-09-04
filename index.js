const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // To Allow Access From Front END. npm i cors then app.use(cors());
const userController = require("./controllers/usercontroller");
require("dotenv").config(); // To Allow Moving DB to ENV  npm i dotenv

const controller = require("./controllers/controllers");
const url = process.env.Mongo_URL;

const app = express();
mongoose.connect(url).then(() => {
  console.log("Connected to codeX dataBase that has course ");
});

app.use(express.json());
app.use(cors());

app.get("/api/courses", controller.getAllCourses);
app.post("/api/courses", controller.addnewCourse);
app.get("/api/courses/:id", controller.getSingleCourse);
app.patch("/api/courses/:id", controller.updateCourse);
app.delete("/api/courses/:id", controller.deleteCourse);

app.get("/api/users", userController.getAllusers);
app.post("/api/register", userController.register);
//app.use((req, res) => {
//res.status(404).json({ msg: "Route not found" });
//});

app.listen(process.env.port || 3000, () => {
  console.log("Server is listenning to port 3000");
});
