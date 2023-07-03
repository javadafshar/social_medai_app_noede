"use strict";

/** @format */
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  GID: {
    type: String
  },
  PersonalCode: {
    type: String,
    unique: true
  },
  UserName: {
    type: String,
    required: true,
    min: 3,
    unique: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ProfilePicture: {
    type: String,
    "default": ""
  },
  CoverPicture: {
    type: String,
    "default": ""
  },
  Followers: {
    type: Array,
    "default": []
  },
  Following: {
    type: Array,
    "default": []
  },
  IsAdmin: {
    type: Boolean,
    "default": false
  },
  Description: {
    type: String,
    max: 500
  },
  Address: {
    type: String
  },
  Sex: {
    type: String,
    "enum": ["Male", "Female"]
  },
  Mobile: {
    type: Number,
    minlength: 9,
    maxlength: 11,
    unique: true
  },
  Phone: {
    type: Number,
    minlength: 7,
    maxlength: 11,
    unique: true
  },
  UserStatuse: {
    type: Boolean,
    "default": false
  },
  ConductorPermition: {
    type: Boolean,
    "default": false
  },
  Sign: {
    type: String
  },
  //Relationship: { type: String, enum: ["Male", "Female"] },
  Relationship: {
    type: String,
    "enum": ["Married", "Single"]
  },
  City: {
    type: String
  },
  Educations: {
    type: String
  },
  UserType: {
    type: String,
    "enum": ["Admin", "Editor", "Reporter", "Geust"],
    "default": "Geust"
  }
}, {
  timestamps: true
});
var User = mongoose.model("User", UserSchema);
module.exports = User;