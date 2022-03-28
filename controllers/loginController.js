const profile = require('../models/Profile');

const matchUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await profile.findOne({ email, password }).lean();

    if (user && user.isActive) {
        res.json({ user: user._id, name: user.nickName })
    } else {
        res.json({ status: 'error', message: 'invalid email or password' })
    }
}

module.exports = { matchUser }