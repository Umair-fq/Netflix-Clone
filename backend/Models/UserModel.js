const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    likedMovies: Array,
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
