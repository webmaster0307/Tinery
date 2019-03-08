const express = require("express");
const router = express.Router();
const Activitymodel = require("../../models/activitymodel");

// router.get("/activitydb", (req, res) => res.json({ msg: "activity Works" }));

//GET

// @route
// @desc
// @access

router.get("/activity", (req, res) => {
  Activitymodel.find().then(activity => res.json(activity));
});

// router.get("/activity/:activitykey", (req, res) => {
//   Activitymodel.find({
//     activitykey: this.props.activities.activities.activitykey
//   }).then(activity => res.json(activity));
// });

// @route
// @desc
// @access

router.get("/activity/:activitykey", (req, res) => {
  Activitymodel.find({ activitykey: req.params.activitykey }).then(activity =>
    res.json(activity)
  );
});

//POST

// @route
// @desc
// @access

router.post("/activity", (req, res) => {
  //   console.log(req.body);
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

//PUT

// @route
// @desc
// @access

router.put("/activity/:id", (req, res) => res.send({ type: "PUT" }));

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

router.delete("/activity/:id", (req, res) => res.send({ type: "DELETE" }));

module.exports = router;
