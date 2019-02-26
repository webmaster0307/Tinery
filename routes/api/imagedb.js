const express = require("express");
const router = express.Router();
// const path = require("path");

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

router.post("/image", upload.any(), (req, res, next) => {
  console.log(req);
  const image = new Imagemodel({
    name: req.body.name,
    imagefile: req.files[0].filename
  });
  image
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created image successfully",
        createdImage: {
          name: result.name,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:5000/upload/" + result._id
            //     }
            //     request: {
            //       type: "GET",
            //       url: "http://localhost:5000/public/uploads"
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/image", (req, res) => {
  Imagemodel.find().then(city => res.json(city));
});

module.exports = router;
