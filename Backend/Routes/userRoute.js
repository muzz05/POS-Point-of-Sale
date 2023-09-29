const { Router } = require("express");
const router = Router();
const User = require("../Models/User");
const {
  hashPassword,
  verifyPassword,
} = require("../Utilities/PasswordProtection");

// Route 1: This is to Register the user / METHOD: POST
router.post("/register", async (req, res) => {
  const { cashierId, password, name } = req.body;
  try {
    let user = await User.findOne({ cashierId });
    if (user) {
      return res
        .status(400)
        .send({ success: false, message: "This User Already Exists" });
    }
    user = new User({ name, cashierId, password: hashPassword(password) });
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Has Been Registered Successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some Error occured in the server" });
  }
});

// Route 2: This is to Login The User / METHOD: POST
router.post("/login", async (req, res) => {
  const { cashierId, password } = req.body;
  try {
    let user = await User.findOne({ cashierId });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "This User Doesnot Exist" });
    }
    if (!verifyPassword(password, user.password)) {
      return res.status(400).send({
        success: false,
        message: "You have Entered the Wrong Password",
      });
    }
    res.status(200).send({
      success: true,
      message: "User Have Been Logged In Successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Some Error occured in the server" });
  }
});

module.exports = router;
