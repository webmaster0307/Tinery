const express = require("express");
const router = express.Router();

// router.get("/citydb", (req, res) => res.json({ msg: "City Works" }));

//GET

router.get("/citydb", (req, res) => res.send({ type: "GET" }));

//POST

router.post("/citydb", (req, res) => res.send({ type: "POST" }));

//PUT

router.put("/citydb:id", (req, res) => res.send({ type: "PUT" }));

//DELETE

router.delete("/citydb:id", (req, res) => res.send({ type: "DELETE" }));

module.exports = router;
