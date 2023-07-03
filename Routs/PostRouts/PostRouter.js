/** @format */

const { json } = require("express");
const express = require("express");
const { update } = require("lodash");
const router = express.Router();
const PostModel = require("../../Models/postModel.js");
const User = require("../../Models/UserModel.js");

// get all
router.get("/", async (req, res) => {
  try {
    const Allpost = await PostModel.find().sort();
    if (!Allpost) {
      return res.status(400).json("no Post find");
    }
    res.status(200).json(Allpost);
  } catch (error) {
    console.log(error);
  }
});

// get on
router.get("/:id", async (req, res) => {
  try {
    const findpost = await PostModel.findById(req.params.id);
    !findpost && res.status(403).json("user not found");
    res.status(200).json(findpost);
  } catch (error) {
    console.log(error);
  }
});

// delete one post
router.delete("/:id", async (req, res) => {
  try {
    const deletOnepost = await PostModel.findByIdAndDelete(req.params.id);
    !deletOnepost && res.status(403).json("Post not found");
    res.status(200).json(deletOnepost);
  } catch (error) {
    console.log(error);
  }
});

//add New Post
router.post("/", async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save post" });
  }
});

// Update a Post

router.put("/:id", async (req, res) => {
  try {
    const updatePost = await PostModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-__v");
    if (!updatePost) {
      res.status(404).json("Post not found");
      console.log(updatePost);
    }
    if (updatePost.UserId === req.body.UserId) {
      // Update the comparison to use req.params.id
      res
        .status(200)
        .json({ data: updatePost, message: "Post has been updated" });
    } else {
      res.status(404).json("You can only update your own post"); // Update the error message
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// post like

router.put("/:id/like", async (req, res) => {
  try {
    const UserId = req.body.UserId;
    const postlike = await PostModel.findById(req.params.id);

    if (!postlike) {
      res.status(403).json({ data: `"post not found" ` });
    }
    if (!postlike.like.includes(UserId)) {
      postlike.like.push(UserId);
      await postlike.save();
      const numberPostlike = postlike.like.length;
      res
        .status(200)
        .json({ data: postlike, message: ` "liked" ${numberPostlike}` });
    } else {
      postlike.like.pull(UserId);
      await postlike.save();
      const numberdPostlike = postlike.like.length;
      res
        .status(200)
        .json({ data: postlike, message: `"disliked"${numberdPostlike} ` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all post from a user

router.get("/post/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await PostModel.find({ UserId: userId });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/timeline/:UserId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.UserId);
    const userPosts = await PostModel.find({ UserId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.Following.map((s) => {
        return PostModel.find({ UserId: s });
      })
    );
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const currentUser = await User.findOne({ UserName: req.params.username });
    const post = await PostModel.find({ UserId: currentUser._id });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
