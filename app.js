const express = require('express');
const app = express();
let path = require('path');
const connected = require("./connection.js");
const { loadBirds } = require("./scheduler.js");

connected
    .then(() => {
        console.log("connected!");
        app.listen(process.env.PORT || 8080, () => {
            console.log('Listening on port ' + (process.env.PORT || 8080));
        });

    });

const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', routes);

function birdTask() {
    try {
        loadBirds();
    }
    catch (error) {
        console.log(error);
    }
}

// Runs Scheduled task
setInterval(() => {
    birdTask();
}, 1296000000);