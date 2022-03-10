const CollectedBird = require('../models/CollectedBird');
const axios = require('axios');
const Bird = require('../models/Bird');

const getBirds = (req, res) => {
    let filter = {};
    if (req.query.conservationStatus) {
        filter = {
            ...filter,
            conservationStatus: req.query.conservationStatus,
        }
    }
    if (req.query.searchKeyword) {
        filter = {
            ...filter,
            $text: {
                '$search': req.query.searchKeyword
            }
        }
    }
    Bird.find(filter).skip(req.query.page * req.query.maxResults).limit(req.query.maxResults).then(result => {
        res.send(result);
    })
        .catch(err => {
            res.status(400).send(err)
        })
};

const getBirdsByLocation = async (req, res) => {
    try {
        const config = {
            headers: {
                "X-eBirdApiToken": "ltmn95icte7g"
            }
        }
        const response = await axios.get(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${req.query.lat}&lng=${req.query.lng}&maxResults=${req.query.maxResults}`, config);
        const birds = await Bird.find({
            "sciName": {
                "$in": response.data.map((data) => data.sciName)
            }
        });
        res.send(birds);
    } catch (err) {
        res.status(400).send(err);
    }
};

const getBirdBySciName = (req, res) => {
    Bird.find({ sciName: req.params.sciName }).then(result => {
        res.send(result);
    })
        .catch(err => {
            res.status(400).send(err)
        })
}

const getBirdGallery = async (req, res) => {
    try {
        const response = await CollectedBird.find({ sciName: req.params.sciName });
        res.send(response);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports = {
    getBirds,
    getBirdsByLocation,
    getBirdBySciName,
    getBirdGallery,
};