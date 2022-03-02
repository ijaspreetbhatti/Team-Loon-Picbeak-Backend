const mongoose = require('mongoose');

const CollectedBirdImageMetadataSchema = mongoose.Schema({
    imageType: String,
    imageHeight: String,
    imageWidth: String,
    uploadDate: Date,
})

const CollectedBirdSchema = mongoose.Schema({
    collectedBirdId: String,
    collectedBirdSciName: String,
    collectedBirdImage: String,
    collectedBirdImageMetadata: CollectedBirdImageMetadataSchema,
})

const collectedBird = mongoose.model('collectedBird', CollectedBirdSchema);

module.exports = collectedBird;