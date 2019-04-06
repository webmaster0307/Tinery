const express = require("express");
const router = express.Router();
const Itinmodel = require("../../models/itinerarymodel");

//-------------------------------------------------------------
//GET
//-------------------------------------------------------------
// @route /api/itin/
// @desc Get All Itineraries
// @access Public

router.get("/itin", (req, res) => {
  Itinmodel.find().then(itin => res.json(itin));
});
//-------------------------------------------------------------
// @route /api/itin/:city
// @desc Get Itinerary by City name
// @access Public

router.get("/itin/:cityurl", (req, res) => {
  Itinmodel.find({ cityurl: req.params.cityurl }).then(itin => res.json(itin));
});

//-------------------------------------------------------------
// @route /api/itinid/:city
// @desc Get Itinerary by ID
// @access Public

router.get("/itinid/:id", (req, res) => {
  Itinmodel.findById(req.params.id).then(itin => res.json(itin));
});

//-------------------------------------------------------------
// @route /api/itinid/
// @desc Get Itinerary by posting Array of IDs (Favorites)
// @access Public

router.post("/itinid/", (req, res) => {
  Itinmodel.find({ _id: { $in: req.body.favid } }).then(itin => res.json(itin));
});

//-------------------------------------------------------------
// @route /api/itinhashtag/
// @desc Get Itinerary by posting Hashtag
// @access Public

router.post("/itinhashtag/", (req, res) => {
  Itinmodel.find({ hashtag: { $in: req.body.hashtag } }).then(itin =>
    res.json(itin)
  );
});

//POST
// -------------------------------------------------------------
// @route /api/itin/
// @desc Post Itineraries
// @access Public

router.post("/itin", (req, res) => {
  const itinerary = new Itinmodel({
    title: req.body.title,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    author: req.body.author,
    likes: req.body.likes,
    image: req.body.image,
    cityurl: req.body.cityurl,
    hashtag: req.body.hashtag
  });

  itinerary
    .save()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

//-------------------------------------------------------------

module.exports = router;
