const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    recipeId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    preptime: {
        type: String,
        required: true
    },
    prep: {
        type: [String],
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    serving: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
         type: Date, 
         default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
