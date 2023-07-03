"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/** @format */
var _require = require("express"),
    json = _require.json;

var express = require("express");

var _require2 = require("lodash"),
    update = _require2.update;

var router = express.Router();

var PostModel = require("../../Models/postModel.js");

var User = require("../../Models/UserModel.js"); // get all


router.get("/", function _callee(req, res) {
  var Allpost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(PostModel.find().sort());

        case 3:
          Allpost = _context.sent;

          if (Allpost) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json("no Post find"));

        case 6:
          res.status(200).json(Allpost);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // get on

router.get("/:id", function _callee2(req, res) {
  var findpost;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(PostModel.findById(req.params.id));

        case 3:
          findpost = _context2.sent;
          !findpost && res.status(403).json("user not found");
          res.status(200).json(findpost);
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
}); // delete one post

router["delete"]("/:id", function _callee3(req, res) {
  var deletOnepost;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(PostModel.findByIdAndDelete(req.params.id));

        case 3:
          deletOnepost = _context3.sent;
          !deletOnepost && res.status(403).json("Post not found");
          res.status(200).json(deletOnepost);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //add New Post

router.post("/", function _callee4(req, res) {
  var newPost, savedPost;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          newPost = new PostModel(req.body);
          _context4.next = 4;
          return regeneratorRuntime.awrap(newPost.save());

        case 4:
          savedPost = _context4.sent;
          res.status(200).json(savedPost);
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            error: "Failed to save post"
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Update a Post

router.put("/:id", function _callee5(req, res) {
  var updatePost;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(PostModel.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }).select("-__v"));

        case 3:
          updatePost = _context5.sent;

          if (!updatePost) {
            res.status(404).json("Post not found");
            console.log(updatePost);
          }

          if (updatePost.UserId === req.body.UserId) {
            // Update the comparison to use req.params.id
            res.status(200).json({
              data: updatePost,
              message: "Post has been updated"
            });
          } else {
            res.status(404).json("You can only update your own post"); // Update the error message
          }

          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json("Internal Server Error");

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // post like

router.put("/:id/like", function _callee6(req, res) {
  var UserId, postlike, numberPostlike, numberdPostlike;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          UserId = req.body.UserId;
          _context6.next = 4;
          return regeneratorRuntime.awrap(PostModel.findById(req.params.id));

        case 4:
          postlike = _context6.sent;

          if (!postlike) {
            res.status(403).json({
              data: "\"post not found\" "
            });
          }

          if (postlike.like.includes(UserId)) {
            _context6.next = 14;
            break;
          }

          postlike.like.push(UserId);
          _context6.next = 10;
          return regeneratorRuntime.awrap(postlike.save());

        case 10:
          numberPostlike = postlike.like.length;
          res.status(200).json({
            data: postlike,
            message: " \"liked\" ".concat(numberPostlike)
          });
          _context6.next = 19;
          break;

        case 14:
          postlike.like.pull(UserId);
          _context6.next = 17;
          return regeneratorRuntime.awrap(postlike.save());

        case 17:
          numberdPostlike = postlike.like.length;
          res.status(200).json({
            data: postlike,
            message: "\"disliked\"".concat(numberdPostlike, " ")
          });

        case 19:
          _context6.next = 24;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 24:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 21]]);
}); // get all post from a user

router.get("/post/:userId", function _callee7(req, res) {
  var userId, posts;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.params.userId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(PostModel.find({
            UserId: userId
          }));

        case 4:
          posts = _context7.sent;
          res.status(200).json({
            data: posts
          });
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get("/timeline/:userId", function _callee8(req, res) {
  var currentUser, userPosts, friendsPosts;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.userId));

        case 3:
          currentUser = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(PostModel.find({
            userId: currentUser._id
          }));

        case 6:
          userPosts = _context8.sent;
          _context8.next = 9;
          return regeneratorRuntime.awrap(Promise.all(currentUser.Following.map(function (s) {
            return PostModel.find({
              userId: s
            });
          })));

        case 9:
          friendsPosts = _context8.sent;
          res.status(200).json(userPosts.concat.apply(userPosts, _toConsumableArray(friendsPosts)));
          _context8.next = 16;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get("/profile/:username", function _callee9(req, res) {
  var currentUser, post;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            UserName: req.params.username
          }));

        case 3:
          currentUser = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(PostModel.find({
            UserId: currentUser._id
          }));

        case 6:
          post = _context9.sent;
          res.status(200).json(post);
          _context9.next = 13;
          break;

        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          res.status(400).json(_context9.t0);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;