"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @format */
var express = require("express");

var mongoose = require("mongoose");

var Router = express.Router();

var users = require("../../Models/UserModel");

var bcrypt = require("bcrypt");

var _require = require("express"),
    json = _require.json; // create user


Router.post("/Adduser", function _callee(req, res) {
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
          return regeneratorRuntime.awrap(new users({
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
            UserType: req.body.UserType
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
}); // find Alluser

Router.get("/", function _callee2(req, res) {
  var Alluser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(users.find());

        case 3:
          Alluser = _context2.sent;
          !Alluser && res.status(400).json("Users Not found");
          res.status(200).json(Alluser);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //find One User

Router.get("/profile", function _callee3(req, res) {
  var userId, username, oneuser, _oneuser$_doc, password, updateAt, oder;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.query.userId;
          username = req.query.username;
          _context3.prev = 2;

          if (!userId) {
            _context3.next = 9;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(users.findById(req.params._id));

        case 6:
          _context3.t0 = _context3.sent;
          _context3.next = 12;
          break;

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(users.findOne({
            UserName: username
          }));

        case 11:
          _context3.t0 = _context3.sent;

        case 12:
          oneuser = _context3.t0;
          !oneuser && res.status(400).json({
            data: "user not found"
          });
          _oneuser$_doc = oneuser._doc, password = _oneuser$_doc.password, updateAt = _oneuser$_doc.updateAt, oder = _objectWithoutProperties(_oneuser$_doc, ["password", "updateAt"]);
          res.status(200).json(oder);
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t1 = _context3["catch"](2);
          res.status(500).json(_context3.t1);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 18]]);
}); //get a user

Router.get("/", function _callee4(req, res) {
  var UserId, UserName, user, _user$_doc, password, updatedAt, other;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          UserId = req.query.UserId;
          UserName = req.query.UserName;
          _context4.prev = 2;

          if (!userId) {
            _context4.next = 9;
            break;
          }

          _context4.next = 6;
          return regeneratorRuntime.awrap(users.findById(UserId));

        case 6:
          _context4.t0 = _context4.sent;
          _context4.next = 12;
          break;

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(users.findOne({
            UserName: UserName
          }));

        case 11:
          _context4.t0 = _context4.sent;

        case 12:
          user = _context4.t0;
          _user$_doc = user._doc, password = _user$_doc.password, updatedAt = _user$_doc.updatedAt, other = _objectWithoutProperties(_user$_doc, ["password", "updatedAt"]);
          res.status(200).json(other);
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t1 = _context4["catch"](2);
          res.status(500).json(_context4.t1);

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 17]]);
}); // update User

Router.put("/:id", function _callee5(req, res) {
  var salt, UpdateUser, _UpdateUser$_doc, password, other;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(req.body.userId === req.params.id || req.body.IsAdmin)) {
            _context5.next = 27;
            break;
          }

          if (!req.body.password) {
            _context5.next = 14;
            break;
          }

          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 5:
          salt = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 8:
          req.body.password = _context5.sent;
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](2);
          res.status(500).json(_context5.t0);

        case 14:
          _context5.prev = 14;
          _context5.next = 17;
          return regeneratorRuntime.awrap(users.findOneAndUpdate({
            _id: req.params.id
          }, // Update the query to match the correct user ID
          {
            $set: req.body
          }, {
            "new": true
          } // Make sure to set the 'new' option to true to return the updated user object
          ));

        case 17:
          UpdateUser = _context5.sent;
          _UpdateUser$_doc = UpdateUser._doc, password = _UpdateUser$_doc.password, other = _objectWithoutProperties(_UpdateUser$_doc, ["password"]);
          res.status(200).json({
            data: other,
            message: "Acount Updated"
          });
          _context5.next = 25;
          break;

        case 22:
          _context5.prev = 22;
          _context5.t1 = _context5["catch"](14);
          res.status(500).json(_context5.t1);

        case 25:
          _context5.next = 28;
          break;

        case 27:
          res.status(400).json("You can only update your account");

        case 28:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 11], [14, 22]]);
}); // Delete Route

Router["delete"]("/:id", function _callee6(req, res) {
  var deletedUser;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(req.body.userId === req.params.id || req.user && req.user.IsAdmin)) {
            _context6.next = 15;
            break;
          }

          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(users.findByIdAndDelete(req.params.id));

        case 4:
          deletedUser = _context6.sent;

          if (deletedUser) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 7:
          res.status(200).json({
            message: "Account deleted successfully"
          });
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json(_context6.t0);

        case 13:
          _context6.next = 16;
          break;

        case 15:
          res.status(400).json("You can only delete your account");

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // Get followers of a user

Router.get("/:id/followers", function _callee7(req, res) {
  var _userId, user, followers;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _userId = req.params.id; // Find the user

          _context7.next = 4;
          return regeneratorRuntime.awrap(users.findById(_userId));

        case 4:
          user = _context7.sent;

          if (user) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 7:
          _context7.next = 9;
          return regeneratorRuntime.awrap(users.find({
            Following: _userId
          }));

        case 9:
          followers = _context7.sent;
          res.status(200).json(followers);
          _context7.next = 16;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json(_context7.t0);

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // followings

Router.put("/:id/followings", function _callee8(req, res) {
  var _userId2, id, findUser, currentUser;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _userId2 = req.body.userId;
          id = req.params.id; // Check if userId and id are the same

          if (!(_userId2 === id)) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", res.status(403).json("You cannot follow yourself."));

        case 5:
          _context8.next = 7;
          return regeneratorRuntime.awrap(users.findById(id));

        case 7:
          findUser = _context8.sent;

          if (findUser) {
            _context8.next = 10;
            break;
          }

          return _context8.abrupt("return", res.status(404).json("User not found."));

        case 10:
          _context8.next = 12;
          return regeneratorRuntime.awrap(users.findById(_userId2));

        case 12:
          currentUser = _context8.sent;

          if (currentUser) {
            _context8.next = 15;
            break;
          }

          return _context8.abrupt("return", res.status(404).json("Current user not found."));

        case 15:
          if (!findUser.Followers.includes(_userId2)) {
            _context8.next = 17;
            break;
          }

          return _context8.abrupt("return", res.status(403).json("You have already followed this user."));

        case 17:
          _context8.next = 19;
          return regeneratorRuntime.awrap(findUser.updateOne({
            $push: {
              Followers: _userId2
            }
          }));

        case 19:
          _context8.next = 21;
          return regeneratorRuntime.awrap(currentUser.updateOne({
            $push: {
              Following: id
            }
          }));

        case 21:
          res.status(200).json("Successfully followed the user.");
          _context8.next = 27;
          break;

        case 24:
          _context8.prev = 24;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json(_context8.t0);

        case 27:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 24]]);
}); // unfollow

Router.put("/:id/unfollow", function _callee9(req, res) {
  var _userId3, id, findUser, currentUser;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _userId3 = req.body.userId;
          id = req.params.id; // Check if userId and id are the same

          if (!(_userId3 === id)) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", res.status(403).json("You cannot unfollow yourself."));

        case 5:
          _context9.next = 7;
          return regeneratorRuntime.awrap(users.findById(id));

        case 7:
          findUser = _context9.sent;

          if (findUser) {
            _context9.next = 10;
            break;
          }

          return _context9.abrupt("return", res.status(404).json("User not found."));

        case 10:
          _context9.next = 12;
          return regeneratorRuntime.awrap(users.findById(_userId3));

        case 12:
          currentUser = _context9.sent;

          if (currentUser) {
            _context9.next = 15;
            break;
          }

          return _context9.abrupt("return", res.status(404).json("Current user not found."));

        case 15:
          if (findUser.Followers.includes(_userId3)) {
            _context9.next = 17;
            break;
          }

          return _context9.abrupt("return", res.status(403).json("You are not following this user."));

        case 17:
          _context9.next = 19;
          return regeneratorRuntime.awrap(findUser.updateOne({
            $pull: {
              Followers: _userId3
            }
          }));

        case 19:
          _context9.next = 21;
          return regeneratorRuntime.awrap(currentUser.updateOne({
            $pull: {
              Following: id
            }
          }));

        case 21:
          res.status(200).json("Successfully unfollowed the user.");
          _context9.next = 27;
          break;

        case 24:
          _context9.prev = 24;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json(_context9.t0);

        case 27:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 24]]);
});
module.exports = Router;