const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create City Schema

const ActivitySchema = new Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  activitykey: {
    type: String
  }
});

// // EXPORT CITY
const Activity = mongoose.model("activities", ActivitySchema);

module.exports = Activity;
