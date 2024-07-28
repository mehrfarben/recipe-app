const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    id: Number,
    img: String,
    name: String,
    desc: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
