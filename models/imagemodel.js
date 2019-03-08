const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  name: { type: String },
  imagefile: { type: String },
  avatar: { type: String }
  //   image: { type: String, required: true }
});

module.exports = mongoose.model("images", ImageSchema);
