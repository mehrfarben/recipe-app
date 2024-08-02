const express = require('express');
const UserData = require('../models/userdata');

const router = express.Router();

router.post('/favorites', async (req, res) => {
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
});

router.get('/favorites/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const userFavorite = await UserData.findOne({ username });

    if (!userFavorite) {
      return res.status(404).json({ message: 'Favorites not found' });
    }

    return res.status(200).json(userFavorite);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
