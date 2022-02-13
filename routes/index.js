const router = require('express').Router();
const profileRouter = require('./profiles');

router.use('/api/v1/profile', profileRouter);

module.exports = router;