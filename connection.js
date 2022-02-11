const mongoose = require('mongoose');
// Using this package to load .env file that has environment variables
require('dotenv/config');

const connectionPromise = mongoose.connect(process.env.DB_CONNECTION);

module.exports = connectionPromise;