const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  cityname: {
    type: String
    // required: [true, "Name field is required"]
  },
  country: {
    type: String
  },
  url: {
    type: String
  },
  id: {
    type: String
  }
});

// // EXPORT CITY
const City = mongoose.model("cities", CitySchema);

module.exports = City;
