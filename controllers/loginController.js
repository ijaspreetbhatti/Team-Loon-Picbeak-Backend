const login = require('../models/Login');
const profile = require('../models/Profile');

const matchUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await profile.findOne({ email, password }).lean();

    if (user) {
        res.json({ status: 'ok', message: 'logged in!' })
    } else {
        res.json({ status: 'error', message: 'invalid email or password' })
    }
}

module.exports = { matchUser }