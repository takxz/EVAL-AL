const GetRankings = require('./Application/GetRankings')
const InMemoryRankingsRepository = require('./Infrastructure/InMemoryRankingsRepository');
const getRankingsRoute = require('./Infrastructure/RankingsRoutes');

function createRankingsModule({ repository = new InMemoryRankingsRepository()} = {}) {
    const getRankings = new GetRankings(repository);

    return {
        router: getRankingsRoute(getRankings)
    }
}

module.exports = createRankingsModule;