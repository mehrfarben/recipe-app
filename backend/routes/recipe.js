const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe');

router.post('/', recipeController.addRecipe);
router.get('/', recipeController.getRecipes);
router.get('/:recipeId', recipeController.getRecipeById);
router.delete('/:recipeId', recipeController.deleteRecipe);
router.put('/:recipeId', recipeController.updateRecipe);

module.exports = router;
