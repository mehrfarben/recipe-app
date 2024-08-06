const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  }
}, { timestamps: true });

ratingSchema.index({ recipeId: 1, username: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
