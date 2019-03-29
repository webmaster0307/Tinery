const express = require("express");
const router = express.Router();

// Comment model
const Commentmodel = require("../../models/commentmodel");

// Validation
const validateCommentInput = require("../../validation/comments");

//GET

// @route GET api/comment/
// @desc  Get All Comments
// @access Public

router.get("/comment", (req, res) => {
  Commentmodel.find().then(comment => res.json(comment));
});

// @route GET api/comment/:activitykey
// @desc  Get comment by key
// @access Public

router.get("/comment/:activitykey", (req, res) => {
  Commentmodel.find({ activitykey: req.params.activitykey }).then(comment =>
    res.json(comment)
  );
});

// @route GET api/commentid/:ID
// @desc  Get comment by ID
// @access Public

router.get("/commentid/:id", (req, res) => {
  // console.log(req.params.id);
  Commentmodel.findById(req.params.id).then(comment => res.json(comment));
});

//POST

// @route   POST api/comment
// @desc    Create comment
// @access  Public

router.post("/comment", (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const comment = new Commentmodel({
    message: req.body.message,
    user: req.body.user,
    timestamp: req.body.timestamp,
    avatar: req.body.avatar,
    activitykey: req.body.activitykey
  });

  comment
    .save()
    .then(doc => {
      // console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
