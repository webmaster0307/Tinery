const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItinSchema = new Schema({
  title: {
    type: String
  },
  duration: {
    type: Number
  },
  price: {
    type: String
  },
  author: {
    type: String
  },
  authorid: {
    type: String
  },
  authorimage: {
    type: String
  },
  cityurl: {
    type: String
  },
  hashtag: {
    type: Array
  },
  activitykey: {
    type: String
  },
  ratings: {
    type: Number
  },
  likes: {
    type: Array
  }
});

const Itinerary = mongoose.model("itineraries", ItinSchema);
module.exports = Itinerary;
