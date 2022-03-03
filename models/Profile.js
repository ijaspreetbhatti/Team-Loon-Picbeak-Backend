const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    isActive: { type: Boolean, default: true },
    nickName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    collectedBirds: [String],
    portraitId: String
});

module.exports = mongoose.model('profile', ProfileSchema);