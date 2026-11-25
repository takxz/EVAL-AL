const express = require("express");

function getRankingsRoute(getRankings) {
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        try {
            const rankings = await getRankings.execute();
            if(!rankings){
                return res.status(404).json({message: "No rankings found"})
            }
            res.json(rankings)
        } catch (error) {
            next(error)
        }
    });

    return router;
}

module.exports = getRankingsRoute;
