const express = require("express");
const router = express.Router();
// const path = require("path");

const Itinmodel = require("../../models/itinerarymodel");
const Citymodel = require("../../models/citymodel");
const Activitymodel = require("../../models/activitymodel");

// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("np accepted file"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const Imagemodel = require("../../models/imagemodel");

// // @route api/image
// // @desc
// // @access

// router.get("/image", (req, res) => {
//   Imagemodel.find().then(city => res.json(city));
// });

// @route api/image
// @desc Post Images (testing)
// @access Public

router.post("/image", upload.any(), (req, res, next) => {
  // console.log(req.body);
  // console.log(req.files[0].filename);
  const image = new Imagemodel({
    name: req.body.name,
    avatar: "/uploads/" + req.files[0].filename
  });
  image
    .save()
    .then(result => {
      // console.log(result);
      res.status(201).json({
        message: "Created image successfully",
        createdImage: {
          name: result.name,
          _id: result._id,
          request: {
            type: "GET",
            url: "/uploads/" + result._id
            //     }
            //     request: {
            //       type: "GET",
            //       url: "http://localhost:5000/public/uploads"
          }
        }
      });
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// START OF CMS ROUTES
//-----------------------------------------------------------------

// @route api/cms/itin
// @desc Post Itinerary
// @access Public

router.post("/cms/itin", upload.any(), (req, res, next) => {
  // console.log(req.body);
  // console.log(req.files[0].filename);

  // const avatar = "/uploads/" + req.files[0].filename;
  // const avatar = "/uploads/" + req.body.avatar;

  const itinerary = new Itinmodel({
    title: req.body.title,
    activitykey: req.body.activitykey,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    author: req.body.author,
    likes: req.body.likes,
    authorimage: req.body.authorimage,
    cityurl: req.body.cityurl,
    hashtag: req.body.hashtag
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

// @route api/cms/itin/:id
// @desc Update/Edit Activity Info
// @access Public

router.post("/cms/itin/:id", upload.any(), (req, res, next) => {
  // LOGIC TO HANDLE NEW IMAGE FILE OR EXISTING IMAGE FILE
  // const imagenotupdated = req.body.image;
  // const image =
  //   req.body.image === null || req.body.image === undefined
  //     ? "/uploads/" + req.files[0].filename
  //     : imagenotupdated;

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

//-----------------------------------------------------------------

// @route api/cms/activity
// @desc Post Activity
// @access Public

router.post("/cms/activity", upload.any(), (req, res, next) => {
  const image = "/uploads/" + req.files[0].filename;
  const activity = new Activitymodel({
    title: req.body.title,
    image: image,
    activitykey: req.body.activitykey
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

// @route api/cms/activity/:id
// @desc Update/Edit Activity Info
// @access Public

router.post("/cms/activity/:id", upload.any(), (req, res, next) => {
  // LOGIC TO HANDLE NEW IMAGE FILE OR EXISTING IMAGE FILE
  const imagenotupdated = req.body.image;
  const image =
    req.body.image === null || req.body.image === undefined
      ? "/uploads/" + req.files[0].filename
      : imagenotupdated;

  const cmsfields = {};
  cmsfields.title = req.body.title;
  cmsfields.image = image;

  Activitymodel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: cmsfields },
    { new: true }
  ).then(activity => res.json(activity));
});

//-----------------------------------------------------------------

// @route api/cms/city
// @desc Post City
// @access Public

router.post("/cms/city", upload.any(), (req, res, next) => {
  const flagimg = "/uploads/" + req.files[0].filename;
  const city = new Citymodel({
    cityname: req.body.cityname,
    country: req.body.country,
    url: req.body.url,
    flagimg: flagimg
  });
  city
    .save()
    .then(() => {
      res.status(201).json({
        message: "Created City successfully"
      });
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// @route api/cms/city/:id
// @desc Update/Edit City Info
// @access Public

router.post("/cms/city/:id", upload.any(), (req, res, next) => {
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

module.exports = router;
