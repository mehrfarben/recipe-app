const UserData = require('../models/userdata');

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

const Recipe = require('../models/recipe');
const Rating = require('../models/rating');

exports.getFavorites = async (req, res) => {
    const { username } = req.params;

    try {
        const userFavorite = await UserData.findOne({ username });

        if (!userFavorite) {
            return res.status(404).json({ message: 'Favorites not found' });
        }

        const favoriteRecipes = await Recipe.find({ recipeId: { $in: userFavorite.favorites } });

        const favoriteRecipesWithRatings = await Promise.all(
            favoriteRecipes.map(async (recipe) => {
                const ratings = await Rating.find({ recipeId: recipe.recipeId });
                const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / (ratings.length || 1);
                return { ...recipe.toObject(), averageRating };
            })
        );

        return res.status(200).json({
            favorites: userFavorite.favorites,
            recipes: favoriteRecipesWithRatings,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

