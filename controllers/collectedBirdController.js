const CollectedBird = require('../models/CollectedBird');
const axios = require('axios');

const cloudName = 'scave2021';
const apiKey = '272538467476669';

const getCollectedBirdImage = async (req, res) => {
    try {
        const response = await CollectedBird.find({ sciName: req.params.sciName, author: req.query.author });
        res.send(response);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const createCollectedBirdImage = async (req, res) => {
    try {
        const linkResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            file: req.body.file,
            timestamp: req.body.timestamp,
            upload_preset: 'q6sujdna',
            api_key: apiKey
        });
        const newBirdImage = new CollectedBird({
            sciName: req.params.sciName,
            author: req.params.author,
            imageLink: linkResponse.url
        });
        const response = await newBirdImage.save();
        res.send(response);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports = {
    getCollectedBirdImage,
    createCollectedBirdImage
}