const router = require('express').Router();
const profileRouter = require('./profiles');
const birdRouter = require('./birds');

router.use('/api/v1/profile', profileRouter);
router.use('/api/v1/bird', birdRouter);

module.exports = router;