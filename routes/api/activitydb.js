const express = require("express");
const router = express.Router();
const Activitymodel = require("../../models/activitymodel");

//GET

// @route GET api/activity
// @desc GET all activity
// @access Public

router.get("/activity", (req, res) => {
  Activitymodel.find().then(activity => res.json(activity));
});

// @route GET api/activity/activitykey
// @desc GET activity by activitykey
// @access Public

router.get("/activity/:activitykey", (req, res) => {
  Activitymodel.find({ activitykey: req.params.activitykey }).then(activity =>
    res.json(activity)
  );
});

//POST

// @route api/activity
// @desc POST activity to MongoDB
// @access Public

router.post("/activity", (req, res) => {
  const activity = new Activitymodel({
    title: req.body.title,
    image: req.body.image,
    activitykey: req.body.activitykey
  });
  activity
    .save()
    .then(doc => {
      console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
