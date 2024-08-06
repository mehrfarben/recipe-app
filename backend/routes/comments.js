const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/', auth, commentController.addComment);
router.get('/:recipeId', commentController.getComments);
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;
