const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Using this package to load .env file that has environment variables
const connected = require('dotenv/config');

// Importing the routes for users
const profileRoutes = require('./routes/profiles');

connected
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log('Listening on port ' + (process.env.PORT || 8080));
        });
    })

app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    console.log(req);
    const loadSchema = mongoose.Schema({
        size: Number
    });
    const loadModel = mongoose.model('load', loadSchema);
    const newLoad = new loadModel({
        size: req.body.size
    });
    try {
        newLoad.save().then((rs) => { res.json({ id: rs["_id"], status: "SUCCESS", statusCode: "CRTSMONGO200" }) });
    }
    catch (err) {
        res.json(err)
    }
})

app.use('/profile', profileRoutes);

// Connecting to MongoDB using mongoose ODM package
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewURLParser: true },
    () => {
        console.log('Connected to db');
    },
    (err) => {
        console.log(err)
    }
);