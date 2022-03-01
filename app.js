const express = require('express');
const app = express();
let path = require('path');
const connected = require("./connection.js");

connected
    .then(() => {
        console.log("connected!");
        app.listen(process.env.PORT || 8080, () => {
            console.log('Listening on port ' + (process.env.PORT || 8080));
        });

    });

// Importing the routes for users
const routes = require('./routes/index');
// const profileRoutes = require('./routes/profiles');
// const collectedBirdRoutes = require('./routes/collectedBirds');
// const birdRoutes = require('./routes/birds');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', routes);
// app.use('/profile', profileRoutes);
// app.use('/collectedBird', collectedBirdRoutes);
// app.use('/bird', birdRoutes);