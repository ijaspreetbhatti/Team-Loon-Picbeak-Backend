const express = require('express');
const router = express.Router();

const { getProfiles, getProfile, postProfile, putProfile, deleteProfile, addCollectedBird } = require('../controllers/profileController')

router.get("/", getProfiles);
router.get("/:id", getProfile);
router.post("/", postProfile);
router.put("/:id", putProfile);
router.delete("/:id", deleteProfile);
router.put("/:id/:sciName", addCollectedBird);

module.exports = router;