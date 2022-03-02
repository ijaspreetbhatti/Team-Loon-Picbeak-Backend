const mongoose = require('mongoose');

const PortraitSchema = mongoose.Schema({
    imageLink: String
})

const portrait = mongoose.model('portrait', PortraitSchema);

module.exports = portrait;