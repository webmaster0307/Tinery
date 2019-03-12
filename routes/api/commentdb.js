const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

// Comment model
const Commentmodel = require("../../models/commentmodel");
// User model
const User = require("../../models/usermodel");

// Validation
const validateCommentInput = require("../../validation/comments");

// router.get("/commentdb", (req, res) => res.json({ msg: "comment Works" }));

//GET

// @route GET api/comment/
// @desc  Get All Comments
// @access Public

router.get("/comment", (req, res) => {
  console.log(req.body[0]);
  console.log(req.body);
  console.log(req.params);
  Commentmodel.find().then(comment => res.json(comment));
});

// @route GET api/comment
// @desc  Get comment by key
// @access Public

router.get("/comment/:activitykey", (req, res) => {
  console.log(req.body);
  Commentmodel.find({ activitykey: req.params.activitykey }).then(comment =>
    res.json(comment)
  );
});

// @route GET api/comment
// @desc  Get comment by key
// @access Public

router.get("/commentid/:id", (req, res) => {
  console.log(req.params.id);
  Commentmodel.findById(req.params.id).then(comment => res.json(comment));
});

//POST

// @route   POST api/comment
// @desc    Create comment
// @access  Public

router.post("/comment", (req, res) => {
  // console.log(req.body.comments);
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const comment = new Commentmodel({
    message: req.body.message,
    user: req.body.user,
    timestamp: req.body.timestamp,
    avatar: req.body.avatar,
    activitykey: req.body.activitykey
  });

  comment
    .save()
    .then(doc => {
      // console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

// router.get("/comment/:id", (req, res) => {
//   Commentmodel.find({ id: req.params.id }).then(comment => res.json(comment));
// });

// router.get("/comment/:id", (req, res) => {
//   console.log(req.params);
//   Commentmodel.findById(req.params._id)
//     .then(post => {
//       if (post) {
//         res.json(post);
//       } else {
//         res.status(404).json({ nopostfound: "No post found with that ID" });
//       }
//     })
//     .catch(err =>
//       res.status(404).json({ nopostfound: "No post found with that ID" })
//     );
// });

//PUT

// @route
// @desc
// @access

// router.put("/comment/:activitykey", (req, res) => res.send({ type: "PUT" }));

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

router.delete("/comment/:activitykey", (req, res) =>
  res.send({ type: "DELETE" })
);

// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Post.findById(req.params.id)
//         .then(post => {
//           // Check for post owner
//           if (post.user.toString() !== req.user.id) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           }

//           // Delete
//           post.remove().then(() => res.json({ success: true }));
//         })
//         .catch(err => res.status(404).json({ postnotfound: "No post found" }));
//     });
//   }
// );

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/commentlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Comment.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/commentlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Comment.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
