const express = require('express');

const getRanking = require('./Infrastructure/rankingRoutes')
const RANKING_PORT = 3002;

const app = express();
app.use(express.json());

app.use('/api/ranking', getRanking());

app.listen(RANKING_PORT, () => {
    console.log("Ranking module listening port " + RANKING_PORT)
})