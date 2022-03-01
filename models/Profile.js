const mongoose = require('mongoose');

const { UserBirdSchema } = require('./Bird');

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
    collectedBirds: [UserBirdSchema]
});

module.exports = mongoose.model('profile', ProfileSchema);