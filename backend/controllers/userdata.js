const UserData = require('../models/userdata');
const Recipe = require('../models/recipe');
const Rating = require('../models/rating');

exports.toggleFavorite = async (req, res) => {
    const { recipeId, username } = req.body;

    try {
        const userFavorite = await UserData.findOne({ username });

        if (userFavorite) {
            if (!userFavorite.favorites.includes(recipeId)) {
                userFavorite.favorites.push(recipeId);
                await userFavorite.save();
                return res.status(200).json({ message: 'Recipe added to favorites' });
            } else {
                userFavorite.favorites = userFavorite.favorites.filter(id => id !== recipeId);
                await userFavorite.save();
                return res.status(200).json({ message: 'Recipe removed from favorites' });
            }
        } else {
            const newUserFavorite = new UserData({
                username,
                favorites: [recipeId]
            });
            await newUserFavorite.save();
            return res.status(201).json({ message: 'Recipe added to favorites' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

exports.getFavorites = async (req, res) => {
    const { username } = req.params;

    try {
        const userFavorite = await UserData.findOne({ username });

        if (!userFavorite) {
            return res.status(404).json({ message: 'Favorites not found' });
        }

        const favoriteRecipes = await Recipe.find({ recipeId: { $in: userFavorite.favorites } }).lean();

        const recipeIds = favoriteRecipes.map(recipe => recipe.recipeId.toString());

        const averageRatings = await Rating.aggregate([
            { $match: { recipeId: { $in: recipeIds } } },
            { $group: { _id: "$recipeId", averageRating: { $avg: "$rating" } } }
        ]);

        const ratingsMap = new Map(averageRatings.map(item => [item._id, item.averageRating]));

        const favoriteRecipesWithRatings = favoriteRecipes.map(recipe => ({
            ...recipe,
            averageRating: Number((ratingsMap.get(recipe.recipeId.toString()) || 0).toFixed(1))
        }));

        return res.status(200).json({
            favorites: userFavorite.favorites,
            recipes: favoriteRecipesWithRatings,
        });
    } catch (error) {
        console.error('Error in getFavorites:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

