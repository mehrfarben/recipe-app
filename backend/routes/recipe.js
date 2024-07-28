const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

// router.post('/', async (req, res) => {
//     const { img, name, desc } = req.body;
//     const recipe = new Recipe({ img, name, desc });
//     await recipe.save();
//     res.status(201).send('Recipe added');
// });

router.get('/', async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

module.exports = router;
