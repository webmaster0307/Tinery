const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: {
    type: String,
    // type: Schema.Types.ObjectId,
    required: true
  },
  // _id: { type: Number },
  user: {
    type: String,
    required: true
  },
  timestamp: {
    type: String
  },
  activitykey: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: String,
        // type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// // EXPORT CITY
const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
