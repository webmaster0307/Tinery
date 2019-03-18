const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookierParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const cors = require("cors");
// const passportGoogle = require("./config/passportGoogle");

// DB Config & Internal Links

const db = require("./config/keys").mongoURI;

//ROUTES

const citydb = require("./routes/api/citydb");
const itinerarydb = require("./routes/api/itinerarydb");
const activitydb = require("./routes/api/activitydb");
const commentdb = require("./routes/api/commentdb");

// const authdb = require("./routes/api/authdb");
const cmsdb = require("./routes/api/cmsdb");
const profiledb = require("./routes/api/profiledb");
const usersdb = require("./routes/api/usersdb");

require("./models/usermodel");

// mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EXPRESS & PORT CONFIG
// ==============================================

const app = express();

// CORS
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};

app.use(cors(corsOption));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
// INIT ROUTES

app.use("/api", citydb);
app.use("/api", itinerarydb);
app.use("/api", activitydb);
app.use("/api", commentdb);
app.use("/api", cmsdb);

// ROUTES
//==============================================

// EXPRESS MIDDLWARE
app.use(cookierParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// Set Global Variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// AUTH ROUTES

app.use("/auth", usersdb);
// app.use("/auth", authdb);
app.use("/auth", profiledb);

//PASSPORT CONFIG
require("./config/passport")(passport);
// require("./config/passportGoogle")(passport);

// Serve Static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set client/build folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
}

const port = process.env.port || 5000;

// START THE SERVER
// =============================================

app.listen(port, () => console.log(`Listening on port ${port}`));
