const express = require('express');
const router = express.Router();

const { getCollectedBirdImage, createCollectedBirdImage } = require('../controllers/collectedBirdController')

router.get("/:author/:sciName", getCollectedBirdImage);
router.post("/:author/:sciName", createCollectedBirdImage);

module.exports = router;