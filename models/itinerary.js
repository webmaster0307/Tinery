const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItinSchema = new Schema({
  title: {
    type: String
    // required: [true, "Name field is required"]
  },
  rating: {
    type: Number
  },
  duration: {
    type: Number
  },
  price: {
    type: Number
  },
  author: {
    type: String
  },
  likes: {
    type: Number
  },
  image: {
    type: String
  },
  cityurl: {
    type: String
  },
  hashtag: {
    type: Array
  }
});

// // EXPORT CITY
const Itinerary = mongoose.model("itineraries", ItinSchema);

module.exports = Itinerary;
