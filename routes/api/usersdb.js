const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// const passport = require("passport");
const multer = require("multer");

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("no accepted file"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// IMPORT USER MODEL
const User = require("../../models/usermodel");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// REGISTER ROUTE

// @route /auth/user/register
// @desc Register Users to MongoDB
// @access Public

router.post("/user/register", upload.any(), (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const gravatarImage = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const avatar =
        req.body.avatar === "null"
          ? gravatarImage
          : "/uploads/" + req.files[0].filename;

      const newUser = new User({
        username: req.body.username,
        avatar: avatar,
        password: req.body.password,
        password2: req.body.password2,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        googleID: "",
        facebookID: "",
        country: req.body.country
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// SOCIAL ROUTE

// @route /auth/user/registersocial
// @desc Register and Login Users to MongoDB via Social Media (Google)
// @access Private

router.post("/user/registersocial", (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    // FIND IF USER EXISTS
    if (user) {
      const payload = {
        id: user.id,
        username: user.username,
        avatar: user.avatar
        // favorites: user.favorites
      };
      // SIGN IN
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    } else {
      // CREATE NEW USER
      const newUser = new User({
        username: req.body.username,
        avatar: req.body.avatar,
        password: req.body.password,
        password2: req.body.password2,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        googleID: req.body.googleID,
        facebookID: req.body.facebookID,
        country: req.body.country
      });
      // BCRYPT
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

      // User.findOne({ email: req.body.email }).then(user => {
      const payload = {
        id: req.body.id,
        username: req.body.username,
        avatar: req.body.avatar
        // favorites: user.favorites
      };

      //SIGN IN USER
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });

      // )}
    }
  });
});

//LOGIN ROUTE

// @route /auth/user/login
// @desc Login Users via MongoDB
// @access Private

router.post("/user/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
          // favorites: user.favoritesuser.favorites
        };
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
        // res.json({ msg: "Email and password success" });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// EXPORT
module.exports = router;
