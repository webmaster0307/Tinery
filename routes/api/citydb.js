const express = require("express");
const router = express.Router();
const Citymodel = require("../../models/citymodel");

// router.get("/citydb", (req, res) => res.json({ msg: "City Works" }));

//GET

router.get("/test", (req, res) => {
  Citymodel.find().then(city => res.json(city));
});

//POST

router.post("/test", (req, res) => {
  console.log(req.body);
  const city = new Citymodel({
    cityname: req.body.cityname,
    country: req.body.country,
    url: req.body.url
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

router.put("/test/:id", (req, res) => res.send({ type: "PUT" }));

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

router.delete("/test/:id", (req, res) => res.send({ type: "DELETE" }));

module.exports = router;
