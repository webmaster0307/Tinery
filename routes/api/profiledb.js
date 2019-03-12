const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const passport = require("passport");

//  Load User model
const User = require("../../models/usermodel");
// Load Profile model
// const Itinerary = require("../../models/itinerary");

//-------------------------------------------------------------

// @route   GET auth/profile/
// @desc    Tests Profile Route
// @access  Public
router.get("/profile", (req, res) => res.json({ msg: "profile Works" }));

//-------------------------------------------------------------

// @route   GET auth/profile/:id
// @desc    Tests profile route by User ID
// @access  Public

router.get(
  "/profile/get/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.id);
    console.log("from profiledb");
    User.findById(req.params.id)
      // .populate("user", ["username", "avatar", "favorites"])
      .then(user => res.json(user))
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET auth/current
// @desc    Tests profile route by User ID
// @access  Public

router.get(
  "/current",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      // id: req.user._id,
      // name: req.user.username,
      email: req.user.email
    });
  }
);

// @route   GET auth/profile/:currentid
// @desc    Get Profile route by User ID
// @access  Public

// router.get(
//   "/profile/:id",
//   // passport.authenticate("jwt", { session: true }),
//   (req, res) => {
//     console.log(req.params.id);
//     console.log("hello");
//     // const errors = {};

//     // User.findOne({ user: req.user._id })
//     User.findById(req.params.id)
//       // User.findOneAndUpdate()
//       // .populate("user", ["username", "avatar", "favorites"])
//       .then(user => {
//         // if (!user) {
//         //   errors.nouser = "There is no user for this account";
//         //   return res.status(404).json(errors);
//         // }
//         res.json(user);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

//-------------------------------------------------------------

// @route   POST auth/profile/:id
// @desc    Add to Favorites in User Profile
// @access  Private

router.post(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    console.log(req.body.favorites);
    // console.log(req.params);
    // console.log(req.params.id);
    User.findById(req.params.id).then(user => {
      // Check if new Favorites does not exist in Array of Favorites
      if (!user.favorites.includes(req.body.favorites)) {
        // Add Favorite to array of Favorites
        user.favorites.unshift(req.body.favorites);
        user.save().then(user => res.json(user));
        // console.log(user);
      }
    });
  }
);

//-------------------------------------------------------------

// router.get("/profile/:userid/:activitykey", (req, res) => {
//   Activitymodel.find({ activitykey: req.params.activitykey }).then(activity =>
//     res.json(activity)
//   );
// });

// router.get("/profile/:url", (req, res) => {
//   Itinmodel.find({ cityurl: req.params.url }).then(itin => res.json(itin));
// });

//-------------------------------------------------------------

// @route   DELETE auth/profile/:id
// @desc    Delete Favorite from User
// @access  Private
router.delete(
  "/profile/removefav/:id/:favid",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("body", req.body);
    // console.log("user", req.user);
    // console.log("body", req.body.id);
    // console.log("fav", req.body.favorite);
    // console.log("fav", req.body.favorites);

    console.log("req params user id", req.params.id);
    console.log("req params fav id", req.params.favid);
    // User.findById(req.params.id).then(user => {
    //   // User.findOne({ user: req.user.id }).then(user => {
    //   console.log("from fav", user.favorites);

    //   // console.log(req.body);
    //   // console.log(req.body.favorites);
    //   user.favorites
    //     .findByIdAndRemove(req.body)
    //     .then(() => res.json({ success: true }))

    //     // Delete
    //     // favorite.remove().then(() => res.json({ success: true }));
    //     // })
    //     .catch(err => res.status(404).json({ success: false }));
    // });
  }
);

//-------------------------------------------------------------

module.exports = router;
