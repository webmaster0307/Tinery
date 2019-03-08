const express = require("express");
const router = express.Router();
const passport = require("passport");

// const User = require("../../models/usermodel");

// Google

// router.get("/google", (req, res) => res.send("auth"));

// @route
// @desc
// @access

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route
// @desc
// @access

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("callback", req.user);
    // res.redirect("/dashboard");
    res.redirect("/");
  }
);

// VERIFY

// @route
// @desc
// @access

router.get("/verify", (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log("Not Auth");
  }
});

// router.get("/google", passport.authenticate("google"), (req, res) => {
//   res.send("you reached the redirect URI");
// });

// @route
// @desc
// @access

// callback route for google to redirect to
// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//   res.send("you reached the redirect URI");
// });

// FACEBOOK

// @route
// @desc
// @access

router.get("/facebook", (req, res) => {
  res.send("logging in with facebook");
});

// LOGOUT

// @route
// @desc
// @access

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  console.log("Logged Out");
});

module.exports = router;
