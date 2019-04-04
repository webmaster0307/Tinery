const express = require("express");
const router = express.Router();
const Itinmodel = require("../../models/itinerarymodel");
const Citymodel = require("../../models/citymodel");
const Activitymodel = require("../../models/activitymodel");
const multer = require("multer");

//VALIDATION
const validateCmsCity = require("../../validation/cmscity");
const validateCmsItin = require("../../validation/cmsitin");
const validateCmsActivity = require("../../validation/cmsactivity");

//MULTER SETUP
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

// START OF CMS ROUTES
//-----------------------------------------------------------------

// @route api/cms/itin
// @desc Post/Create new Itinerary
// @access Public

router.post("/cms/itin", upload.any(), (req, res, next) => {
  const { errors, isValid } = validateCmsItin(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const itinerary = new Itinmodel({
    title: req.body.title,
    activitykey: req.body.activitykey,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    likes: req.body.likes,
    cityurl: req.body.cityurl,
    hashtag: req.body.hashtag,
    author: req.body.author,
    authorimage: req.body.authorimage,
    authorid: req.body.authorid
  });
  itinerary
    .save()
    .then(() => {
      res.status(201).json({
        message: "Created Itin successfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @route api/cms/itinedit/:id
// @desc Update/Edit Itinerary Info
// @access Public

router.post("/cms/itinedit/:id", upload.any(), (req, res, next) => {
  const cmsfields = {};
  cmsfields.title = req.body.title;
  cmsfields.activitykey = req.body.activitykey;
  cmsfields.rating = req.body.rating;
  cmsfields.duration = req.body.duration;
  cmsfields.price = req.body.price;
  cmsfields.author = req.body.author;
  cmsfields.likes = req.body.likes;
  cmsfields.authorimage = req.body.authorimage;
  cmsfields.cityurl = req.body.cityurl;
  cmsfields.hashtag = req.body.hashtag;

  Itinmodel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: cmsfields },
    { new: true }
  ).then(itinerary => res.json(itinerary));
});

// @route   DELETE api/cms/deleteitin/:id
// @desc    Delete Itinerary by ID
// @access  Private

router.delete("/cms/deleteitin/:id", (req, res) => {
  Itinmodel.findOneAndRemove({ _id: req.params.id })
    .then(user => {
      res.json(user);
    })
    .catch(() => res.status(404).json({ success: false }));
});

//-----------------------------------------------------------------

// @route api/cms/activity
// @desc Post/Create new Activity
// @access Public

router.post("/cms/activity", upload.any(), (req, res, next) => {
  const { errors, isValid } = validateCmsActivity(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const image = "/uploads/" + req.files[0].filename;
  const activity = new Activitymodel({
    title: req.body.title,
    image: image,
    activitykey: req.body.activitykey,
    authorid: req.body.authorid
  });
  activity
    .save()
    .then(() => {
      res.status(201).json({
        message: "Created Itin successfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @route api/cms/activityedit/:id
// @desc Update/Edit Activity Info
// @access Public

router.post("/cms/activityedit/:id", upload.any(), (req, res, next) => {
  // LOGIC TO HANDLE NEW IMAGE FILE OR EXISTING IMAGE FILE
  const imagenotupdated = req.body.image;
  const image =
    req.body.image === null || req.body.image === undefined
      ? "/uploads/" + req.files[0].filename
      : imagenotupdated;

  const cmsfields = {};
  cmsfields.title = req.body.title;
  cmsfields.activitykey = req.body.activitykey;
  cmsfields.image = image;

  Activitymodel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: cmsfields },
    { new: true }
  ).then(activity => res.json(activity));
});

// @route   DELETE api/cms/deleteactivity/:id
// @desc    Delete Activity by ID
// @access  Private

router.delete(
  "/cms/deleteactivity/:id",

  (req, res) => {
    Activitymodel.findOneAndRemove({ _id: req.params.id })
      .then(user => {
        res.json(user);
      })
      .catch(() => res.status(404).json({ success: false }));
  }
);

//-----------------------------------------------------------------

// @route api/cms/city
// @desc Post/Create new City
// @access Public

router.post("/cms/city", upload.any(), (req, res, next) => {
  const { errors, isValid } = validateCmsCity(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const flagimg = "/uploads/" + req.files[0].filename;
  const city = new Citymodel({
    cityname: req.body.cityname,
    country: req.body.country,
    url: req.body.url,
    flagimg: flagimg,
    authorid: req.body.authorid
  });
  city
    .save()
    .then(() => {
      res.status(201).json({
        message: "Created City successfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @route api/cms/city/:id
// @desc Update/Edit City Info
// @access Public

router.post("/cms/cityedit/:id", upload.any(), (req, res, next) => {
  // LOGIC TO HANDLE NEW IMAGE FILE OR EXISTING IMAGE FILE
  const imagenotupdated = req.body.flagimg;
  const flagimg =
    req.body.flagimg === null || req.body.flagimg === undefined
      ? "/uploads/" + req.files[0].filename
      : imagenotupdated;

  const cmsfields = {};
  cmsfields.cityname = req.body.cityname;
  cmsfields.country = req.body.country;
  cmsfields.url = req.body.url;
  cmsfields.flagimg = flagimg;

  Citymodel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: cmsfields },
    { new: true }
  ).then(city => res.json(city));
});

// @route   DELETE api/cms/deletecity/:id
// @desc    Delete City by ID
// @access  Private

router.delete(
  "/cms/deletecity/:id",

  (req, res) => {
    Citymodel.findOneAndRemove({ _id: req.params.id })
      .then(user => {
        res.json(user);
      })
      .catch(() => res.status(404).json({ success: false }));
  }
);

module.exports = router;
