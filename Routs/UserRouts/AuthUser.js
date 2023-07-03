/** @format */

const router = require("express").Router();
const user = require("../../Models/UserModel");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptpassHash = await bcrypt.hash(req.body.password, salt);
    const newUser = await new user({
      UserName: req.body.UserName,
      Email: req.body.Email,
      password: bcryptpassHash,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const finduser = await user.findOne({ UserName: req.body.UserName });
    if (!finduser) {
      return res.status(400).json("User Not Found");
    }

    const UserPassword = await bcrypt.compare(
      req.body.password,
      finduser.password
    );
    !UserPassword && res.status(400).json("Password is wrong");

    res.status(200).json(finduser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", (req, res) => {
  res.send("GET request to Auth");
});

module.exports = router;
