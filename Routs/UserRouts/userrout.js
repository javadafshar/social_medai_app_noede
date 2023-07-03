/** @format */

const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router();
let users = require("../../Models/UserModel");
const bcrypt = require("bcrypt");
const { json } = require("express");

// create user
Router.post("/Adduser", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptpassHash = await bcrypt.hash(req.body.password, salt);
    const newUser = await new users({
      Name: req.body.Name,
      LastName: req.body.LastName,
      GID: req.body.GID,
      UserName: req.body.UserName,
      Email: req.body.Email,
      PersonalCode: req.body.PersonalCode,
      password: bcryptpassHash,
      ProfilePicture: req.body.ProfilePicture,
      CoverPicture: req.body.CoverPicture,
      Followers: req.body.Followers,
      Following: req.body.Following,
      Description: req.body.Description,
      Address: req.body.Address,
      Sex: req.body.Sex,
      Mobile: req.body.Mobile,
      Phone: req.body.Phone,
      IsAdmin: req.body.IsAdmin,
      UserStatuse: req.body.UserStatuse,
      Sign: req.body.Sign,
      Relationship: req.body.Relationship,
      City: req.body.City,
      Educations: req.body.Educations,
      UserType: req.body.UserType,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// find Alluser
Router.get("/", async (req, res) => {
  try {
    const Alluser = await users.find();
    !Alluser && res.status(400).json("Users Not found");

    res.status(200).json(Alluser);
  } catch (error) {
    console.log(error);
  }
});
//find One User
Router.get("/profile", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const oneuser = userId
      ? await users.findById(req.params._id)
      : await users.findOne({ UserName: username });
    !oneuser && res.status(400).json({ data: "user not found" });
    const { password, updateAt, ...oder } = oneuser._doc;

    res.status(200).json(oder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a user
Router.get("/", async (req, res) => {
  const UserId = req.query.UserId;
  const UserName = req.query.UserName;
  try {
    const user = userId
      ? await users.findById(UserId)
      : await users.findOne({ UserName: UserName });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update User

Router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.IsAdmin) {
    // Make sure to check if req.user is defined before accessing its properties

    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }

    try {
      const UpdateUser = await users.findOneAndUpdate(
        { _id: req.params.id }, // Update the query to match the correct user ID
        { $set: req.body },
        { new: true } // Make sure to set the 'new' option to true to return the updated user object
      );
      const { password, ...other } = UpdateUser._doc;
      res.status(200).json({ data: other, message: "Acount Updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json("You can only update your account");
  }
});

// Delete Route
Router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || (req.user && req.user.IsAdmin)) {
    // Make sure to check if req.user is defined before accessing its properties

    try {
      const deletedUser = await users.findByIdAndDelete(req.params.id);
      // Use findByIdAndDelete method to find and delete the user by ID

      if (!deletedUser) {
        // If user is not found, return an error
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json("You can only delete your account");
  }
});

// Get followers of a user
Router.get("/:id/followers", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the users who have the specified user in their Following array
    const followers = await users.find({ Following: userId });

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// followings
Router.put("/:id/followings", async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    // Check if userId and id are the same
    if (userId === id) {
      return res.status(403).json("You cannot follow yourself.");
    }

    // Find the user to be followed
    const findUser = await users.findById(id);
    if (!findUser) {
      return res.status(404).json("User not found.");
    }

    // Find the current user
    const currentUser = await users.findById(userId);
    if (!currentUser) {
      return res.status(404).json("Current user not found.");
    }

    // Check if current user is already following the user
    if (findUser.Followers.includes(userId)) {
      return res.status(403).json("You have already followed this user.");
    }

    // Update followers for the user to be followed
    await findUser.updateOne({ $push: { Followers: userId } });

    // Update following for the current user
    await currentUser.updateOne({ $push: { Following: id } });

    res.status(200).json("Successfully followed the user.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// unfollow
Router.put("/:id/unfollow", async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    // Check if userId and id are the same
    if (userId === id) {
      return res.status(403).json("You cannot unfollow yourself.");
    }

    // Find the user to be unfollowed
    const findUser = await users.findById(id);
    if (!findUser) {
      return res.status(404).json("User not found.");
    }

    // Find the current user
    const currentUser = await users.findById(userId);
    if (!currentUser) {
      return res.status(404).json("Current user not found.");
    }

    // Check if current user is not following the user
    if (!findUser.Followers.includes(userId)) {
      return res.status(403).json("You are not following this user.");
    }

    // Update followers for the user to be unfollowed
    await findUser.updateOne({ $pull: { Followers: userId } });

    // Update following for the current user
    await currentUser.updateOne({ $pull: { Following: id } });

    res.status(200).json("Successfully unfollowed the user.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = Router;
