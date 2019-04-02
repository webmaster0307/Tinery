const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  cityname: {
    type: String
  },
  country: {
    type: String
  },
  url: {
    type: String
  },
  flagimg: {
    type: String
  },
  authorid: {
    type: String
  }
});

const City = mongoose.model("cities", CitySchema);
module.exports = City;
