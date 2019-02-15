const express = require("express");
const router = express.Router();
const Itinmodel = require("../../models/itinerary");

//GET

router.get("/itin", (req, res) => {
  Itinmodel.find().then(itin => res.json(itin));
});

router.get("/itin/:url", (req, res) => {
  Itinmodel.find({ cityurl: req.params.url }).then(itin => res.json(itin));
});

//POST

router.post("/itin", (req, res) => {
  // console.log(req.body);
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
      console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

//PUT

router.put("/itin/:id", (req, res) => res.send({ type: "PUT" }));

//DELETE

router.delete("/itin/:id", (req, res) => res.send({ type: "DELETE" }));

module.exports = router;
