"use strict";

/** @format */
var express = require("express");

var app = express();
var port = process.env.PORT || 5000;

var mogoose = require("mongoose");

var cors = require("cors");

var userRouter = require("./Routs/UserRouts/userrout");

var Post = require("./Routs/PostRouts/PostRouter"); //const UserRouts = require("./Routs/userRout.js");


var AuthUser = require("./Routs/UserRouts/AuthUser");

app.use(cors()); //const dotenv = require('dotenv')
//const helemet = require ('helmet')
//const morgan =require ('morgan')
//dotenv.config()
//midelware

app.use(express.json()); //app.use(helmet())
//app.use(morgan('common'))
//conection to database

mogoose.connect("mongodb://localhost:27017/Social_netWork").then(function (s) {
  console.log("Conectted To DB");
})["catch"](function (s) {
  console.log("can not Conect To DB");
}); //router

app.use("/api/user", userRouter);
app.use("/api/AuthUser", AuthUser);
app.use("/api/post", Post); //app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, function () {
  return console.log("Social medial Project is runing on port: ".concat(port, "!"));
});