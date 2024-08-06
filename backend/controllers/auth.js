const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, username, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({ 
            $or: [ { username: identifier }, { email: identifier } ]
        });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
