const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


const recipeRoutes = require('./routes/recipe');
app.use('/recipes', recipeRoutes);

mongoose.connect('mongodb://localhost:27017/recipe-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
