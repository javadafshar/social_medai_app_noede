"use strict";

/** @format */
var router = require("express").Router();

var user = require("../../Models/UserModel");

var bcrypt = require("bcrypt"); //register


router.post("/register", function _callee(req, res) {
  var salt, bcryptpassHash, newUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 6:
          bcryptpassHash = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(new user({
            UserName: req.body.UserName,
            Email: req.body.Email,
            password: bcryptpassHash
          }));

        case 9:
          newUser = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(newUser.save());

        case 12:
          res.status(200).json(newUser);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); //Login

router.post("/login", function _callee2(req, res) {
  var finduser, UserPassword;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(user.findOne({
            UserName: req.body.UserName
          }));

        case 3:
          finduser = _context2.sent;

          if (finduser) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json("User Not Found"));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, finduser.password));

        case 8:
          UserPassword = _context2.sent;
          !UserPassword && res.status(400).json("Password is wrong");
          res.status(200).json(finduser);
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get("/register", function (req, res) {
  res.send("GET request to Auth");
});
module.exports = router;