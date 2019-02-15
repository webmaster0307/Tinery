const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create City Schema

const CommentSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: String
  },
  timestamp: {
    type: String
  },
  activitykey: {
    type: String
  }
});

// // EXPORT CITY
const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
