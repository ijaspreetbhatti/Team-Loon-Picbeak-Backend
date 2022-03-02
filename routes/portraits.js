const express = require('express');
const router = express.Router();

const { getPortraits, getPortrait } = require('../controllers/portraitController')

router.get("/", getPortraits);

router.get("/:id", getPortrait);

module.exports = router;