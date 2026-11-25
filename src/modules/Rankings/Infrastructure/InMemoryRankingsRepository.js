const RankingsRepository = require("../Application/Port/RankingsRepository");
const Rankings = require("../Domain/Rankings");

class InMemoryRankingsRepository extends RankingsRepository{
    constructor(){
        super();
        this
    }

    async getRankings(){

    }
}

module.exports = InMemoryRankingsRepository;