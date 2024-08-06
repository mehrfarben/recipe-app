const express = require('express');
const router = express.Router();
const userDataController = require('../controllers/userdata');

router.post('/favorites', userDataController.toggleFavorite);
router.get('/favorites/:username', userDataController.getFavorites);

module.exports = router;
