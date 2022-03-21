const axios = require('axios');
const Bird = require('./models/Bird');
const flickr = require('flickr-sdk')('8391ac68237f2756f302320f6e04fc66');

const loadBirds = async () => {
    console.log('loadBirds');
    const body = {
        "criteriaType": "species",
        "locationCriteria": [
            {
                "paramType": "subnation",
                "subnation": "BC",
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
            "page": 0,
            "recordsPerPage": 1000
        }
    };

    const response = await axios.post("https://explorer.natureserve.org/api/data/speciesSearch", body);

    if (response) {
        const data = [];
        for (let index = 0; index < response.data.results.length; index++) {
            const result = response.data.results[index];
            let bird = {
                sciName: result.scientificName,
                commonName: result.primaryCommonName,
                conservationStatus: result.roundedGRank,
            }
            console.log(`Processing ${bird.sciName}`);

            try {
                const birdImageResponse = await flickr.photos.search({
                    text: bird.sciName || ''
                });
                if (birdImageResponse.body.photos.photo[0]) {
                    const { server, id, secret } = birdImageResponse.body.photos.photo[0];
                    bird = {
                        ...bird,
                        imageLink: `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`,
                    }
                }
            } catch (error) {
                console.log(error);
            }

            try {
                const birdWikiResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${bird.sciName}`);
                if (birdWikiResponse.data.query.pages) {
                    bird = {
                        ...bird,
                        description: birdWikiResponse.data.query.pages[Object.keys(birdWikiResponse.data.query.pages)[0]].extract,
                    }
                }
            } catch (error) {
                console.log(error);
            }

            try {
                const birdAudioResponse = await axios.get(`https://xeno-canto.org/api/2/recordings?query=${bird.sciName}`);
                if (birdAudioResponse.data.recordings) {
                    bird = {
                        ...bird,
                        audioLink: birdAudioResponse.data.recordings[0].file,
                    };
                }
            } catch (error) {
                console.log(error);
            }
            data.push(bird);
            console.log(`Finished processing ${bird.sciName}`);
        }
        console.log(data);
        var fs = require('fs');
        fs.writeFile("data.json", JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully Loaded data');
                saveToMongo();
            }
        });
    } else {
        console.log('err');
    }
}

const saveToMongo = async () => {
    const birds = require('./data.json');
    birds.forEach((bird) => {
        (new Bird(bird)).save()
            .then((response) => {
                // console.log(response);
            }).catch(async err => {
                console.log(err.code);
                if (err.code === 11000) {
                    const response = await Bird.updateOne({ sciName: bird.sciName }, bird);
                }
            })
    });
    console.log('Done');
};

module.exports = { loadBirds, saveToMongo };