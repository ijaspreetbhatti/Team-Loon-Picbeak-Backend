const express = require('express');
const router = express.Router();

const { matchUser } = require('../controllers/loginController')

router.post("/", matchUser)

module.exports = router;