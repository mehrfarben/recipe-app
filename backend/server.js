const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

app.set('io', io);
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

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
