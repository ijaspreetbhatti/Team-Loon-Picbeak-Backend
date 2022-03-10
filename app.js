const express = require('express');
const cors = require('cors');
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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