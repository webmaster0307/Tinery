const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const passport = require("passport");

//  Load User model
const User = require("../../models/usermodel");
// Load Profile model
// const Profile = require("../../models/profilemodel");

//-------------------------------------------------------------
// @route   GET auth/profile/test
// @desc    Tests Profile Route
// @access  Public
router.get("/profile/test", (req, res) => res.json({ msg: "profile Works" }));

//-------------------------------------------------------------
// @route   GET auth/profile/getprofile
// @desc    Get current users profile
// @access  Private

// router.get(
//   "/profile/getprofile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};

//     Profile.findOne({ user: req.user.id })
//       .populate("user", ["username", "avatar"])
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = "There is no profile for this user";
//           return res.status(404).json(errors);
//         }
//         res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

//-------------------------------------------------------------
// @route   GET auth/profile/:user_id
// @desc    Get profile by user ID
// @access  Public

// router.get("/profile/:user_id", (req, res) => {
//   const errors = {};

//   Profile.findOne({ user: req.params.user_id })
//     .populate("user", ["username", "avatar"])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = "There is no profile for this user";
//         res.status(404).json(errors);
//       }

//       res.json(profile);
//     })
//     .catch(err =>
//       res.status(404).json({ profile: "There is no profile for this user" })
//     );
// });

// GET USER INFO
//-------------------------------------------------------------

// @route   GET auth/profile/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get(
  // "/profile/get/:user_id",
  "/profileget",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params.user_id);
    // console.log(req.user.id);
    // console.log(req.body.favorites);
    // const errors = {};
    User.findById(req.user.id)
      // GET FAVORITES BY USER ID
      .then(user => {
        res.json(user.favorites);
      })
      .catch(err =>
        res.status(404).json({ User: "There is no user info for this user" })
      );
  }
);

// FAVORITE ADD & DELETE

//-------------------------------------------------------------

// @route   POST auth/profile/:id
// @desc    Add to Favorites in User Profile
// @access  Private

router.post(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { favorites: req.body.favData } }
    ).then(user => res.json(user.favorites));
  }
);

//-------------------------------------------------------------

// @route   DELETE auth/profile/removefav/:id/:favid
// @desc    Delete Favorite from User
// @access  Private
router.delete(
  "/profile/removefav/:id/:favid",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { favorites: req.params.favid } }
    )
      .then(user => {
        // User.findOne({ user: req.user.id }).then(user => {
        // console.log("from fav", user.favorites);
        res.json(user);
        // Item.findById(req.params.id)
        // .then(item => item.remove().then(() => res.json({ success: true })))
        // .catch(err => res.status(404).json({ success: false }));

        // ({ _id: { $in: req.body.favid } })

        // User.favorites.findById(req.params.favid).then(fav => {
        //   console.log("from user favorites", fav);
        //   // fav.remove().then(() => res.json({ success: true }));
        // });
        // .catch(err => res.status(404).json({ success: false }));
        //   .findById(req.params.favid)
        //   .then(() => res.json({ success: true }));

        // // Delete
        // user.favorites.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

//-------------------------------------------------------------

module.exports = router;
