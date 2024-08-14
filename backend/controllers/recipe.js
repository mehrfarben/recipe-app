const Recipe = require('../models/recipe');
const Rating = require('../models/rating');
const UserData = require('../models/userdata');
const { escapeRegExp } = require('lodash');

exports.addRecipe = async (req, res) => {
    const { recipeId, name, description, image, preptime, prep, ingredients, category, serving, author } = req.body;

    if (!Array.isArray(prep) || !Array.isArray(ingredients)) {
        return res.status(400).json({ message: "Prep and ingredients must be arrays" });
    }

    const newRecipe = new Recipe({ recipeId, name, description, image, preptime, prep, ingredients, category, serving, author });

    try {
        await newRecipe.save();

        req.app.get('io').emit('recipeAdded', newRecipe);

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
            query.name = new RegExp(escapeRegExp(name), 'i');
        }

        const skip = (Math.max(1, parseInt(page)) - 1) * Math.min(100, parseInt(limit));
        const limitValue = Math.min(100, parseInt(limit));

        const recipes = await Recipe.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitValue)
            .lean();

        const totalRecipes = await Recipe.countDocuments(query);

        const recipeIds = recipes.map(recipe => recipe.recipeId.toString());

        const averageRatings = await Rating.aggregate([
            { $match: { recipeId: { $in: recipeIds } } },
            { $group: { _id: "$recipeId", averageRating: { $avg: "$rating" } } }
        ]);

        const ratingsMap = new Map(averageRatings.map(item => [item._id, item.averageRating]));

        const recipesWithRatings = recipes.map(recipe => ({
            ...recipe,
            averageRating: Number((ratingsMap.get(recipe.recipeId.toString()) || 0).toFixed(1))
        }));

        res.status(200).json({
            totalPages: Math.ceil(totalRecipes / limitValue),
            currentPage: Number(page),
            recipes: recipesWithRatings,
        });
    } catch (error) {
        console.error('Error in getRecipes:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
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
        req.app.get('io').emit('recipeDeleted', numericRecipeId);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const { name, description, image, preptime, prep, ingredients, category, serving, author } = req.body;
  
    if (!Array.isArray(prep) || !Array.isArray(ingredients)) {
      return res.status(400).json({ message: "Prep and ingredients must be arrays" });
    }
  
    try {
      const recipe = await Recipe.findOne({ recipeId: Number(recipeId) });
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      recipe.name = name;
      recipe.description = description;
      recipe.image = image;
      recipe.preptime = preptime;
      recipe.prep = prep;
      recipe.ingredients = ingredients;
      recipe.category = category;
      recipe.serving = serving;
      recipe.author = author;
  
      await recipe.save();
      req.app.get('io').emit('recipeUpdated', recipe);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

