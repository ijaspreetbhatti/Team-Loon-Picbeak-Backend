const portrait = require('../models/Portrait');

const getPortraits = async (req, res) => {
    res.json(await portrait.find());
}

const getPortrait = async (req, res) => {
    res.json(await portrait.findOne({ _id: req.params.id }));
}

module.exports = { getPortraits, getPortrait }