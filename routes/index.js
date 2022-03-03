const router = require('express').Router();
const profileRouter = require('./profiles');
const birdRouter = require('./birds');
const collectedBirdRouter = require('./collectedBirds');

router.use('/api/v1/profiles', profileRouter);
router.use('/api/v1/birds', birdRouter);
router.use('/api/v1/collectedBirds', collectedBirdRouter);

module.exports = router;