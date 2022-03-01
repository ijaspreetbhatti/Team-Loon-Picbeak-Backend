const express = require('express');
const router = express.Router();

const { getBirds } = require('../controllers/birdController');

router.post("/", getBirds);

module.exports = router;