const profile = require('../models/Profile');
// const crypto = require('crypto');
// const hash = crypto.createHash('sha1');
// const password = hash.update(req.body.password, 'utf-8');
// const hashedPassword = password.copy().digest('hex');

const getProfiles = async (req, res) => {
    res.json(await profile.find());
};

const getProfile = async (req, res) => {
    res.json(await profile.findOne({ _id: req.params.id }));
};

const postProfile = async (req, res) => {
    console.log(req.body)

    const newUser = new profile({
        nickName: req.body.nickName,
        email: req.body.email,
        password: req.body.password,
    });

    const response = await newUser.save();
    res.json(response);
};

const putProfile = async (req, res) => {
    console.log(req.body)

    const response = await profile.updateOne({ _id: req.params.id }, {
        nickName: req.body.nickName,
        email: req.body.email,
        password: req.body.password,
    })
    res.json(response);
};

const deleteProfile = async (req, res) => {
    const response = await profile.updateOne({ _id: req.params.id }, {
        isActive: false
    });
    res.json(response);
};

module.exports = {
    getProfiles,
    getProfile,
    postProfile,
    putProfile,
    deleteProfile,
};