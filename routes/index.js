const router = require('express').Router();
const profileRouter = require('./profiles');
const birdRouter = require('./birds');
const collectedBirdRouter = require('./collectedBirds');
const loginRouter = require('./login');
const portraitRouter = require('./portraits');

router.use('/api/v1/profiles', profileRouter);
router.use('/api/v1/birds', birdRouter);
router.use('/api/v1/collectedBirds', collectedBirdRouter);
router.use('/api/v1/login', loginRouter);
router.use('/api/v1/portrait', portraitRouter);

module.exports = router;