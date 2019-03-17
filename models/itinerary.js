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
  likes: {
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
  // likes: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: "users"
  //     }
  //   }
  // ],
  // ratings: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: "users"
  //     },
  //     rating: {
  //       type: Number
  //     }
  //   }
  // ]
});

// // EXPORT CITY
const Itinerary = mongoose.model("itineraries", ItinSchema);

module.exports = Itinerary;
