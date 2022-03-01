const axios = require('axios');
const res = require('express/lib/response');

const getBirds = (req, res) => {
    console.log('getBird');
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
            ]
        })
    };
    axios.post("https://explorer.natureserve.org/api/data/speciesSearch", reqOptions).then(response => {
        console.log(response);
        res.json(response)
    }).catch(err => {
        console.log(err);
        res.send(err)
    });
}

module.exports = { getBirds };