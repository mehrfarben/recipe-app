const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const Rating = require('../models/rating');

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
        const { author, name, page = 1, limit = 12 } = req.query;
        
        let query = {};
        if (author) {
            query.author = author;
        }
        if (name) {
            query.name = new RegExp(name, 'i');
        }

        const recipes = await Recipe.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalRecipes = await Recipe.countDocuments(query);

        const recipesWithRatings = await Promise.all(recipes.map(async (recipe) => {
            const ratings = await Rating.find({ recipeId: recipe.recipeId });
            const avgRating = ratings.length > 0
                ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
                : 0;
            
            return {
                ...recipe.toObject(),
                averageRating: Number(avgRating.toFixed(1))
            };
        }));

        res.status(200).json({
            totalPages: Math.ceil(totalRecipes / limit),
            currentPage: Number(page),
            recipes: recipesWithRatings,
        });
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

        const ratings = await Rating.find({ recipeId: Number(recipeId) });
        const avgRating = ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0;

        const recipeWithRating = {
            ...recipe.toObject(),
            averageRating: Number(avgRating.toFixed(1))
        };

        res.status(200).json(recipeWithRating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteRecipe = async (req, res) => {
    const { recipeId } = req.params;

    try {
        const numericRecipeId = Number(recipeId);
        if (isNaN(numericRecipeId)) {
            return res.status(400).json({ message: 'Invalid Recipe ID' });
        }

        const recipe = await Recipe.findOne({ recipeId: numericRecipeId });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        await Recipe.deleteOne({ recipeId: numericRecipeId });
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

