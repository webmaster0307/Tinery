const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
// const keys = require("../config/keys");

// --------------------------------------

const keys = require("./keys");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "keys.google.clientID",
      clientSecret: "keys.google.clientSecret",
      callbackURL: "/auth/user/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport google callback function fired");
    }
  )
);

// --------------------------------------

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
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
};
