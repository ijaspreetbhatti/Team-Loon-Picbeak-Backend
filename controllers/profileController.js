const Profile = require('../models/Profile');
// const crypto = require('crypto');
// const hash = crypto.createHash('sha1');
// const password = hash.update(req.body.password, 'utf-8');
// const hashedPassword = password.copy().digest('hex');

const getProfiles = async (req, res) => {
    try {
        res.json(await Profile.find());
    } catch (err) {
        return res.status(400).send(err);
    }
};

const getProfile = async (req, res) => {
    try {
        res.json(await Profile.findOne({ _id: req.params.id }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

const postProfile = async (req, res) => {
    try {
        console.log(req.body)
        const newUser = new Profile({
            nickName: req.body.nickName,
            email: req.body.email,
            password: req.body.password,
            portrait: '621feb430082282921ade8ac',
            collectedBirds: []
        });
        const response = await newUser.save();
        res.json(response);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const putProfile = async (req, res) => {
    try {
        console.log(req.body)
        const response = await Profile.updateOne({ _id: req.params.id }, {
            nickName: req.body.nickName,
            email: req.body.email,
            password: req.body.password,
            portraitId: req.body.portraitId,
        })
        res.json(response);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const deleteProfile = async (req, res) => {
    try {
        const response = await Profile.updateOne({ _id: req.params.id }, {
            isActive: false
        });
        res.json(response);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const addCollectedBird = async (req, res) => {
    try {
        const response = await Profile.updateOne({ _id: req.params.id }, {
            "$addToSet":
            {
                "collectedBirds": req.params.sciName
            }
        });
        res.json(response);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports = {
    getProfiles,
    getProfile,
    postProfile,
    putProfile,
    deleteProfile,
    addCollectedBird,
};