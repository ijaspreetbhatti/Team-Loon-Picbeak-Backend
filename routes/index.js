const router = require('express').Router();
const profileRouter = require('./profiles');

router.use('/profile', profileRouter);

module.exports = router;