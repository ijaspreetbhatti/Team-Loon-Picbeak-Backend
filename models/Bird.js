const mongoose = require('mongoose');

const BirdSchema = mongoose.Schema({
    sciName: {
        type: String,
        required: true,
        unique: true,
    },
    commonName: {
        type: String,
        required: true,
    },
    conservationStatus: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
    },
    description: {
        type: String,
    },
    audioLink: {
        type: String,
    },
})

BirdSchema.index({ sciName: "text", commonName: "text" });

const Bird = mongoose.model('Bird', BirdSchema);

module.exports = Bird;