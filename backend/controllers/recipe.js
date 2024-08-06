const Recipe = require('../models/recipe');

exports.addRecipe = async (req, res) => {
    const { recipeId, name, description, image, preptime, prep, ingredients, category, serving, author } = req.body;

    if (!Array.isArray(prep) || !Array.isArray(ingredients)) {
        return res.status(400).json({ message: "Prep and ingredients must be arrays" });
    }

    const newRecipe = new Recipe({ recipeId, name, description, image, preptime, prep, ingredients, category, serving, author });

    try {
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.getRecipes = async (req, res) => {
    try {
        const { author } = req.query;
        console.log('Received author query:', author);
        
        let query = {};
        if (author) {
            query.author = author;
        } else {
            console.log('No author specified, returning all recipes');
        }
        const recipes = await Recipe.find(query);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error in /recipes route:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
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
};
