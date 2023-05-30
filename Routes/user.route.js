const express = require("express");
const { UserModel } = require("../Model/users.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let data = await UserModel.find({ email: email });
  try {
    if (data.length > 0) {
      return res.send("Email is already registered try using different email");
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          res.send("Fill all the Details");
        } else {
          const userData = new UserModel({
            name,
            email,
            password: hash,
          });

          await userData.save();
          res.send("User Registered");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Something went wrong while registering user");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let data = await UserModel.find({ email: email });
  console.log(data);
  try {
    if (data.length == 0) {
      return res.send("Email is not registered you have to register first");
    } else {
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ email: data[0].email }, process.env.KEY);
          res.send({
            Message: "Login Successful",
            "Your Token": token,
          });
        } else {
          res.send("Password is wrong");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Something went wrong while login user");
  }
});

module.exports = {
  userRouter,
};
