const mongoose = require('mongoose');

const BirdSchema = mongoose.Schema({
    sciName: String,
    commonName: String,
    imageLink: String,
    imageType: String,
    audioLink: String,
    gallery: [String],
    description: String,
    conservationStatus: String,
});

module.exports = mongoose.model('bird', BirdSchema);