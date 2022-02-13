const mongoose = require('mongoose');

const BirdUserImageMetadataSchema = mongoose.Schema({
    dateUploaded: Date,
    imageType: String
})

const UserBirdSchema = mongoose.Schema({
    birdId: String,
    birdUserImage: String,
    birdUserImageMetadata: BirdUserImageMetadataSchema,
})

const bird = mongoose.model('bird', UserBirdSchema);

module.exports = {
    bird: bird,
    UserBirdSchema
};