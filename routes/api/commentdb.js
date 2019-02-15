const express = require("express");
const router = express.Router();
const Commentmodel = require("../../models/commentmodel");

// router.get("/commentdb", (req, res) => res.json({ msg: "comment Works" }));

//GET

router.get("/comment", (req, res) => {
  Commentmodel.find().then(comment => res.json(comment));
});

// router.get("/comment/:commentkey", (req, res) => {
//   Commentmodel.find({
//     commentkey: this.props.activities.activities.commentkey
//   }).then(comment => res.json(comment));
// });

router.get("/comment/:activitykey", (req, res) => {
  Commentmodel.find({ activitykey: req.params.activitykey }).then(comment =>
    res.json(comment)
  );
});

//POST

// app.post('/api/messages', (req, res) => {
//   let {
//       name,
//       message
//   } = req.body
//   if (name && message) {
//       name = name.trim()
//       message = message.trim()
//   } else {
//       return res.status(422).send("Name and message required!")
//   }

//   const newSignature = new Signature({
//       "name": name,
//       "message": message
//   })
//   newSignature.save(err => {
//       if (err) return res.status(500).send('Error saving your message!');
//       return res.status(200).send(newSignature);
//   });
// });

router.post("/comment", (req, res) => {
  // console.log(req.body.comments);
  const comment = new Commentmodel({
    message: req.body.message,
    user: req.body.user,
    timestamp: req.body.timestamp,
    activitykey: req.body.activitykey
  });

  comment
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

router.put("/comment/:id", (req, res) => res.send({ type: "PUT" }));

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

router.delete("/comment/:id", (req, res) => res.send({ type: "DELETE" }));

module.exports = router;
