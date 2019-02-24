const express = require("express");
const router = express.Router();
const passport = require("passport");

// Google

router.get(
  "/user/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route for google to redirect to
router.get(
  "/user/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send("you reached the redirect URI");
  }
);

// Facebook

router.get("/user/facebook", (req, res) => {
  res.send("logging in with facebook");
});

// Logout

router.get("/user/logout", (req, res) => {
  res.send("logging out");
});

module.exports = router;
