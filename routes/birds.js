const express = require('express');
const router = express.Router();

const { getBirds, getBirdsByLocation, getBirdBySciName, getBirdGallery } = require('../controllers/birdController');

router.get("/", getBirds);
router.get("/location", getBirdsByLocation);
router.get("/:sciName", getBirdBySciName);
router.get("/:sciName/gallery/", getBirdGallery);

module.exports = router;