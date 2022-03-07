const express = require('express');
const router = express.Router();

const { getBirds, getBirdsByLocation, getBirdBySciName, getBirdDescription, getBirdImage, getBirdAudio, getBirdGallery } = require('../controllers/birdController');

router.get("/", getBirds);
router.get("/location", getBirdsByLocation);
router.get("/:sciName", getBirdBySciName);
router.get("/:sciName/description/", getBirdDescription);
router.get("/:sciName/image/", getBirdImage);
router.get("/:sciName/audio/", getBirdAudio);
router.get("/:sciName/gallery/", getBirdGallery);

module.exports = router;