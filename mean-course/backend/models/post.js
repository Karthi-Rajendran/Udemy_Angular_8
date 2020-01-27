const mongoose = require("mongoose");

// 1.blueprint
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  imagePath: { type: String, required: true}
});

// 2.model to work with it
module.exports = mongoose.model('Post', postSchema);

