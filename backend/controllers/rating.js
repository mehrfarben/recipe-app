const Rating = require('../models/rating');
const Recipe = require('../models/recipe');

exports.rateRecipe = async (req, res) => {
  const { recipeId, username, rating } = req.body;

  try {
    let ratingRecord = await Rating.findOneAndUpdate(
      { recipeId, username },
      { rating },
      { new: true, upsert: true }
    );

    const ratings = await Rating.find({ recipeId });
    const avgRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    await Recipe.findOneAndUpdate({ recipeId }, { rating: avgRating });

    res.status(200).json({ message: 'Rating submitted successfully', avgRating });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getUserRating = async (req, res) => {
  const { recipeId, username } = req.query;

  try {
    const rating = await Rating.findOne({ recipeId, username });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
