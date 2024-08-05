const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', commentSchema);