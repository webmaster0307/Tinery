const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// DB Config & Internal Links

const db = require("./config/keys").mongoURI;

//ROUTES

const citydb = require("./routes/api/citydb");
const itinerarydb = require("./routes/api/itinerarydb");
const activitydb = require("./routes/api/activitydb");
const commentdb = require("./routes/api/commentdb");
const usersdb = require("./routes/api/usersdb");

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EXPRESS & PORT CONFIG
// ==============================================

const app = express();
const port = process.env.port || 5000;

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

// INIT ROUTES

app.use("/api", citydb);
app.use("/api", itinerarydb);
app.use("/api", activitydb);
app.use("/api", commentdb);
app.use("/api", usersdb);

// ROUTES
//==============================================

// PASSPORT MIDDLEWARE
app.use(passport.initialize());

//PASSPORT CONFIG
require("./config/passport")(passport);

// app.get("/cities/", function(req, res) {
//   res.send("The ID of this page is : " + req.params.id);
// });

// app.get("/cities/:id", (req, res) => {
//   console.log(req.params);
//   console.log(req.query);
//   // console.log(req.params.id);
//   res.send("The ID of this page is : " + req.params.id);
// });

// app.get("/api/hello", res => {
//   res.send({ express: "Hello From Express!" });
// });

// app.post("/api/world", (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`
//   );
// });

// START THE SERVER
// =============================================

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.listen(80, function() {
//   console.log("CORS-enabled web server listening on port 80");
// });
