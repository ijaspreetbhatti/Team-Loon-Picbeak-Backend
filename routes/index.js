const router = require('express').Router();
const profileRouter = require('./profiles');
const birdRouter = require('./birds');
const loginRouter = require('./login');
const portraitRouter = require('./portraits');

router.use('/api/v1/profile', profileRouter);
router.use('/api/v1/bird', birdRouter);
router.use('/api/v1/login', loginRouter);
router.use('/api/v1/portrait', portraitRouter);

module.exports = router;