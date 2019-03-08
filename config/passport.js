const mongoose = require("mongoose");
const keys = require("./keys");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = mongoose.model("users");
const passport = require("passport");

// const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// --------------------------------------

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  // JWT
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      // console.log("jwt payload", jwt_payload);
      User.findById(jwt_payload.id)
        .then(User => {
          if (User) {
            return done(null, User);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  // GOOGLE STRATEGY
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);

        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf("?")
        );

        const newUser = {
          googleID: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          avatar: image
        };

        // Check for existing user
        User.findOne({
          googleID: profile.id
        }).then(user => {
          if (user) {
            // Return user
            done(null, user);
          } else {
            // Create user
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: "keys.googleClientID",
  //       clientSecret: "keys.googleClientSecret",
  //       callbackURL: "/auth/google/callback",
  //       proxy: true
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       // console.log("passport google callback function fired");
  //       console.log(accessToken);
  //       console.log(profile);
  //     }
  //   )
  // );

  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: config.facebookAuth.clientID,
  //       clientSecret: config.facebookAuth.clientSecret
  //     },
  //     function(accessToken, refreshToken, profile, done) {
  //       User.upsertFbUser(accessToken, refreshToken, profile, function(
  //         err,
  //         user
  //       ) {
  //         return done(err, user);
  //       });
  //     }
  //   )
  // );
};

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const mongoose = require("mongoose");
// const keys = require("./keys");
// // Load user model
// const User = mongoose.model("users");

// module.exports = function(passport) {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: keys.googleClientID,
//         clientSecret: keys.googleClientSecret,
//         callbackURL: "/auth/google/callback",
//         proxy: true
//       },
//       (accessToken, refreshToken, profile, done) => {
//         // console.log(accessToken);
//         // console.log(profile);

//         const image = profile.photos[0].value.substring(
//           0,
//           profile.photos[0].value.indexOf("?")
//         );

//         const newUser = {
//           googleID: profile.id,
//           firstname: profile.name.givenName,
//           lastname: profile.name.familyName,
//           email: profile.emails[0].value,
//           avatar: image
//         };

//         // Check for existing user
//         User.findOne({
//           googleID: profile.id
//         }).then(user => {
//           if (user) {
//             // Return user
//             done(null, user);
//           } else {
//             // Create user
//             new User(newUser).save().then(user => done(null, user));
//           }
//         });
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => done(null, user));
//   });
// };
