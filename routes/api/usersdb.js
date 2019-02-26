const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// IMPORT USER MODEL
const User = require("../../models/usermodel");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// POST USER ROUTE
router.post("/user/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
      // return res.status(400).json({ email: "Email already exists!" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//LOGIN ROUTE

router.post("/user/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
      // return res.status(404).json({ email: "User email not found!" });
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        };
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
        // res.json({ msg: "Email and password success" });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// TEST ROUTE
router.get(
  "/user/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "success passport" });
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const gravatar = require("gravatar");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
// const passport = require("passport");

// // MULTER IMPORTS
// const multer = require("multer");
// const path = require("path");
// // const upload = multer({ dest: "uploads/" });
// // const app = express();

// // IMPORT USER MODEL
// const User = require("../../models/usermodel");

// // Load Input Validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// // const storage = multer.diskStorage({
// //   destination: function(req, file, cb) {
// //     cb(null, "./upload/");
// //   },
// //   filename: function(req, file, cb) {
// //     cb(null, new Date().toISOString() + file.originalname);
// //   }
// // });
// // //Filters

// // const fileFilter = (req, file, cb) => {
// //   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
// //     cb(null, true);
// //   } else {
// //     cb(new Error("no accepted file"), false);
// //   }
// // };

// // Set The Storage Engine
// // const storage = multer.diskStorage({
// //   destination: "./uploads/",
// //   filename: function(req, file, cb) {
// //     cb(
// //       null,
// //       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
// //     );
// //   }
// // });

// // Init Upload
// // const upload = multer({
// //   storage: storage,
// //   // limits: { fileSize: 1000000 },
// //   fileFilter: function(req, file, cb) {
// //     checkFileType(file, cb);
// //   }
// // }).single("myImage");

// // // Check File Type
// // function checkFileType(file, cb) {
// //   // Allowed ext
// //   const filetypes = /jpeg|jpg|png|gif/;
// //   // Check ext
// //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// //   // Check mime
// //   const mimetype = filetypes.test(file.mimetype);

// //   if (mimetype && extname) {
// //     return cb(null, true);
// //   } else {
// //     cb("Error: Images Only!");
// //   }
// // }

// // POST USER ROUTE

// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public

// //Item Model
// // const Item = require("./models/usermodel");

// // router.post("/", upload.any(), (req, res) => {
// //   console.log(req);
// //   const newItem = new Item({
// //     name: req.body.name,
// //     itemImage: req.files[0].filename
// //   });

// //   newItem.save().then(item => res.json(item));
// // });

// router.post("/user/register", (req, res) => {
//   // console.log(req);
//   const { errors, isValid } = validateRegisterInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       errors.email = "Email already exists";
//       return res.status(400).json(errors);
//     } else {
//       // AVATAR LOGIC
//       const avatar = gravatar.url(req.body.email, {
//         s: "200", // Size
//         r: "pg", // Rating
//         d: "mm" // Default
//       });
//       // } else (req.body.avatar !== null) {
//       //   const avatar = req.body.avatar; }
//       // // } else {
//       // //   // AVATAR LOGIC
//       // //   const avatar = gravatar.url(req.body.email, {
//       // //     s: "200", // Size
//       // //     r: "pg", // Rating
//       // //     d: "mm" // Default
//       // //   });
//       console.log("backend image", req.file[0].myImage);
//       // console.log("backend image", req);
//       // console.log("backend image", req.file[0].myImage);
//       const newUser = new User({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         country: req.body.country,
//         avatar
//       });
//       console.log(newUser);

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

// //LOGIN ROUTE

// router.post("/user/login", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check for user
//     if (!user) {
//       errors.email = "User not found";
//       return res.status(404).json(errors);
//       // return res.status(404).json({ email: "User email not found!" });
//     }
//     // Check Password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User Matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           username: user.username,
//           avatar: user.avatar
//         };
//         // Sign Token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: "Bearer " + token
//             });
//           }
//         );
//         // res.json({ msg: "Email and password success" });
//       } else {
//         errors.password = "Password incorrect";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// // TEST ROUTE
// router.get(
//   "/user/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({ message: "success passport" });
//     res.json({
//       id: req.user.id,
//       username: req.user.username,
//       email: req.user.email
//     });
//   }
// );

// module.exports = router;
