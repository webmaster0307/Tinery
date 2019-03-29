const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItinSchema = new Schema({
  title: {
    type: String
  },
  rating: {
    type: Number
  },
  likes: {
    type: Number
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
  }
});

const Itinerary = mongoose.model("itineraries", ItinSchema);
module.exports = Itinerary;
