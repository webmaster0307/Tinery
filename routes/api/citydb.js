const express = require("express");
const router = express.Router();
const Citymodel = require("../../models/citymodel");

// router.get("/citydb", (req, res) => res.json({ msg: "City Works" }));

//GET

// @route
// @desc
// @access

router.get("/city", (req, res) => {
  Citymodel.find().then(city => res.json(city));
});

//POST

// @route
// @desc
// @access

router.post("/city", (req, res) => {
  // console.log(req.body);
  const city = new Citymodel({
    cityname: req.body.cityname,
    country: req.body.country,
    url: req.body.url,
    id: req.body.id
  });

  city
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

// @route
// @desc
// @access

router.put("/city/:id", (req, res) => res.send({ type: "PUT" }));

// EXAMPLE UPDATE/PUT

// EmailModel.findOneAndUpdate(
//   {
//     email: "ada.lovelace@gmail.com" // search query
//   },
//   {
//     email: "theoutlander@live.com" // field:values to update
//   },
//   {
//     new: true, // return updated doc
//     runValidators: true // validate before update
//   }
// )
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.error(err);
//   });

//DELETE

// @route
// @desc
// @access

router.delete("/city/:id", (req, res) => res.send({ type: "DELETE" }));

module.exports = router;
