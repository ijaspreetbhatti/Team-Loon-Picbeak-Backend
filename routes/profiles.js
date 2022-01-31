const express = require('express');
const router = express.Router();

// Importing model to query MongoDB
const profile = require('../models/Profile');

router.get("/allusers", async (req, res) => {
    res.json(await profile.find());
});

router.post("/createNewUser", (req, res) => {
    const newUser = new profile({ name: req.body.name });
    newUser.save().then((rs) => res.json(rs));
});

module.exports = router;