const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

router.post('/', async (req, res) => {
    const { recipeId, name, description, image, preptime, prep, ingredients, author } = req.body;

    if (!Array.isArray(prep) || !Array.isArray(ingredients)) {
        return res.status(400).json({ message: "Prep and ingredients must be arrays" });
    }

    const newRecipe = new Recipe({ recipeId, name, description, image, preptime, prep, ingredients, author });

    try {
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:recipeId', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const recipe = await Recipe.findOne({ recipeId: Number(recipeId) });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
