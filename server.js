const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require("cors");

// DB Config & Internal Links

const db = require("./config/keys").mongoURI;
const citydb = require("./routes/api/citydb");

// Connect to MongoDB

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EXPRESS & PORT CONFIG
// ==============================================

const app = express();
const port = process.env.port || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INIT ROUTES

app.use("/api", citydb);

// app.use("/api", citydb, (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); //My frontend APP domain
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// app.use(cors());

// app.get("/api/test", cors(), function(req, res, next) {
//   res.json({ msg: "This is CORS-enabled for a Single Route" });
// });

// ROUTES
//==============================================

app.get("/", (req, res) => {
  // console.log("GET Request 2");
  res.send({ name: "Homer Simpson" });
});

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
