const CollectedBird = require('../models/CollectedBird');
const axios = require('axios');
const flickr = require('flickr-sdk')('8391ac68237f2756f302320f6e04fc66');

const getBirds = async (req, res) => {
    try {
        const { pageNumber, recordsPerPage, subnation } = req.query;
        const body = {
            "criteriaType": "species",
            "locationCriteria": [
                {
                    "paramType": "subnation",
                    "subnation": subnation,
                    "nation": "CA"
                }
            ],
            "speciesTaxonomyCriteria": [
                {
                    "paramType": "scientificTaxonomy",
                    "level": "CLASS",
                    "scientificTaxonomy": "Aves",
                    "kingdom": "Animalia"
                }
            ],
            "pagingOptions": {
                "page": pageNumber,
                "recordsPerPage": recordsPerPage
            }
        };
        const response = await axios.post(`https://explorer.natureserve.org/api/data/speciesSearch`, body);
        res.send(response.data.results.map(bird => {
            return {
                sciName: bird.scientificName,
                commonName: bird.primaryCommonName,
                conservationStatus: bird.roundedGRank,
            }
        }));
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

const getBirdBySciName = async (req, res) => {
    try {
        const response = await axios.post(`https://explorer.natureserve.org/api/data/search`, {
            "criteriaType": "combined",
            "textCriteria": [
                {
                    "paramType": "quickSearch",
                    "searchToken": req.params.sciName
                }
            ]
        });
        console.log(response)
        res.send({
            sciName: response.data.results[0].scientificName,
            commonName: response.data.results[0].primaryCommonName,
            conservationStatus: response.data.results[0].roundedGRank,
        });
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

const getBirdDescription = async (req, res) => {
    try {
        const birdWikiResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${req.params.sciName}`);
        if (birdWikiResponse.data.query.pages) {
            res.send({
                description: birdWikiResponse.data.query.pages[Object.keys(birdWikiResponse.data.query.pages)[0]].extract
            });
        } else {
            res.send({ errorMessage: 'Description not available!' });
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const getBirdImage = async (req, res) => {
    try {
        const birdImageResponse = await flickr.photos.search({
            text: req.params.sciName
        });
        if (birdImageResponse.body.photos && birdImageResponse.body.photos.photo.length > 0) {
            const { server, id, secret } = birdImageResponse.body.photos.photo[0];
            res.send({ imageLink: `https://live.staticflickr.com/${server}/${id}_${secret}.jpg` });
        } else {
            res.send({ errorMessage: 'Image not available!' });
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const getBirdAudio = async (req, res) => {
    try {
        const birdAudioResponse = await axios.get(`https://xeno-canto.org/api/2/recordings?query=${req.params.sciName}`);
        if (birdAudioResponse.data.recordings && birdAudioResponse.data.recordings.length > 0) {
            res.send({ audioLink: birdAudioResponse.data.recordings[0].file });
        } else {
            res.send({ errorMessage: 'Audio not available!' });
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

const getBirdGallery = async (req, res) => {
    try {
        const response = await CollectedBird.find({ sciName: req.params.sciName });
        res.send(response);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

module.exports = {
    getBirds,
    getBirdBySciName,
    getBirdDescription,
    getBirdImage,
    getBirdAudio,
    getBirdGallery,
};

// const getBirds = async (req, res) => {
//     console.log('getBird', req);
//     const birds = [];
//     const { pageNumber, recordsPerPage } = req.query;
//     const body = {
//         "criteriaType": "species",
//         "locationCriteria": [
//             {
//                 "paramType": "subnation",
//                 "subnation": "BC",
//                 "nation": "CA"
//             }
//         ],
//         "speciesTaxonomyCriteria": [
//             {
//                 "paramType": "scientificTaxonomy",
//                 "level": "CLASS",
//                 "scientificTaxonomy": "Aves",
//                 "kingdom": "Animalia"
//             }
//         ],
//         "pagingOptions": {
//             "page": pageNumber,
//             "recordsPerPage": recordsPerPage
//         }
//     };
//     const response = await axios.post("https://explorer.natureserve.org/api/data/speciesSearch", body);

//     if (response) {
//         const data = [];
//         for (let index = 0; index < response.data.results.length; index++) {
//             const bird = response.data.results[index];
//             const birdImageResponse = await flickr.photos.search({
//                 text: bird.scientificName || ''
//             });
//             const birdWikiResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${bird.scientificName}`);
//             const birdAudioResponse = await axios.get(`https://xeno-canto.org/api/2/recordings?query=${bird.scientificName}`);
//             if (birdImageResponse.body.photos.photo[0] && birdWikiResponse.data.query.pages && birdAudioResponse.data.recordings) {
//                 const { server, id, secret } = birdImageResponse.body.photos.photo[0];
//                 data.push({
//                     sciName: bird.scientificName,
//                     commonName: bird.primaryCommonName,
//                     conservationStatus: bird.roundedGRank,
//                     imageLink: `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`,
//                     audioLink: birdAudioResponse.data.recordings.file,
//                     gallery: [],
//                     description: birdWikiResponse.data.query.pages[Object.keys(birdWikiResponse.data.query.pages)[0]].extract,
//                 });
//             }
//         }
//         res.send(data)
//     } else {
//         console.log(err);
//         res.send(err)
//     };
// }