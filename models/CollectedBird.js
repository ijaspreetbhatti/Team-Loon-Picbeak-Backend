const mongoose = require('mongoose');

const CollectedBirdSchema = mongoose.Schema({
    sciName: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
})

const collectedBird = mongoose.model('collectedBird', CollectedBirdSchema);

module.exports = collectedBird;