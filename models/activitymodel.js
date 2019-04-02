const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  activitykey: {
    type: String
  },
  authorid: {
    type: String
  }
});

const Activity = mongoose.model("activities", ActivitySchema);
module.exports = Activity;
