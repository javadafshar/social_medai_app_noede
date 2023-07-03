/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    Title: { type: String, require: true },
    PostText: { type: String, require: true },
    Periority: { type: String, enum: ["H", "M", "L"], default: "L" },
    Resurce: { type: String },
    UpdatedBy: { type: String, require: true },
    UserId: { type: String, require: true },
    Media: { type: String },
    like: { type: Array, default: [] },
    protected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
