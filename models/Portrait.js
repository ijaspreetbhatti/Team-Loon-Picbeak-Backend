const mongoose = require('mongoose');

const PortraitImageMetadataSchema = mongoose.Schema({
    imageType: String,
    imageHeight: String,
    imageWidth: String,
    uploadDate: Date,
})

const PortraitSchema = mongoose.Schema({
    portraitId: String,
    portraitImage: String,
    portraitImageMetadata: PortraitImageMetadataSchema,
})

const portrait = mongoose.model('portrait', PortraitSchema);

module.exports = portrait;