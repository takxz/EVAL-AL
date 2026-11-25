const express = require('express');

function getTeamsRoute(getTeams){
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        try {
            const teams = await getTeams.execute();
            if(!teams){
                return res.status(404).json({ message: "Not teams found" });
            }
            res.json(teams)
        } catch (error) {
            next(error)
        }
    });

    return router;
}

module.exports = getTeamsRoute;