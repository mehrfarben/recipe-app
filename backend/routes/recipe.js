const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, description, image, preptime, prep, ingredients } = req.body;

    const newRecipe = new Recipe({ name, description, image, preptime, prep, ingredients });

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

module.exports = router;
