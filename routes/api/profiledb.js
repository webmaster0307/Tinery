const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const passport = require("passport");

//  Load User model
const User = require("../../models/usermodel");
const Itinmodel = require("../../models/itinerarymodel");

// GET USER INFO
//-------------------------------------------------------------

// @route   GET auth/profile/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get(
  "/profileget",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      // GET FAVORITES BY USER ID
      .then(user => {
        res.json(user);
      })
      // .then(user => {
      //   res.json(user.favorites);
      // })
      .catch(() =>
        res.status(404).json({ User: "There is no user info for this user" })
      );
  }
);

//-------------------------------------------------------------
// FAVORITE ADD

// @route   POST auth/profile/postfav/:id
// @desc    Add to Favorites in User Profile
// @access  Private

router.post(
  "/profile/postfav/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { favorites: req.body.favData } }
      // { new: true }
    )
      .then(user => res.json(user.favorites))
      .catch(err => res.status(404).json({ success: false }));
  }
);

//-------------------------------------------------------------
// FAVORITE DELETE

// @route   DELETE auth/profile/removefav/:id/:favid
// @desc    Delete Favorite from User
// @access  Private

router.delete(
  "/profile/removefav/:id/:favid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { favorites: req.params.favid } }
      // { new: true }
    )
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
