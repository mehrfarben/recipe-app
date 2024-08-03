const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    favorites: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('UserData', userDataSchema);