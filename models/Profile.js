const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('profile', ProfileSchema);