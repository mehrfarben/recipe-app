const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const userDataRoutes = require('./routes/userdata');
const commentRoutes = require('./routes/comments');
const ratingRoutes = require('./routes/rating');

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/userdata', userDataRoutes);
app.use('/comments', commentRoutes);
app.use('/rating', ratingRoutes);

mongoose.connect('mongodb://localhost:27017/recipe-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
