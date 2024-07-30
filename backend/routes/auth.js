const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).send('User created');
});

router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    const user = await User.findOne({ 
        $or: [ { username: identifier }, { email: identifier } ]
    });
    if (!user) return res.status(400).send('Invalid credentials');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.json({ token });
});

module.exports = router;