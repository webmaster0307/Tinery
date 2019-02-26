const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ImageSchema = new Schema({
//   img: {
//     type: String
//   }
//   //   { img:
//   //       { data: Buffer, contentType: String }
//   //   }
// });

// const Image = mongoose.model("images", ImageSchema);

// module.exports = Image;

const ImageSchema = mongoose.Schema({
  name: { type: String },
  imagefile: { type: String }
  //   image: { type: String, required: true }
});

module.exports = mongoose.model("images", ImageSchema);
