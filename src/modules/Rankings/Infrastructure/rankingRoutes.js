// app.get('/ranking', (req, res) => {
//     res.json(data.ranking);
// });

const express = require("express");
const data = require('./../data');

function getRanking() {
    const router = express.Router();

    router.get('/', async (req, res) => {
        res.json(data.ranking)
    });
}

module.exports = getRanking;
