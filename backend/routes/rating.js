const express = require('express');
const { rateRecipe, getUserRating } = require('../controllers/rating');

const router = express.Router();

router.post('/rate', rateRecipe);
router.get('/user-rating', getUserRating);

module.exports = router;
