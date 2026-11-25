const RankingsRepository = require("../Application/port/RankingsRepository");
const User = require("../Domain/Rankings");

class InMemoryRankingsRepository extends RankingsRepository{
    constructor(){
        super();
    }

    async findRankings(){

    }
}

module.exports = InMemoryUserRepository;