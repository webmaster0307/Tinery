const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create City Schema & Model

const CitySchema = new Schema({
  cityname: {
    type: String,
    required: [true, "Name field is required"]
  },
  country: {
    type: String
  },
  url: {
    type: String
  }
});

const City = mongoose.model("city", CitySchema);

module.exports = citymodel;
