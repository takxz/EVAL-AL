const GetTeams = require('./Application/GetTeams');
const InMemoryTeamsRepository = require('./Infrastructure/InMemoryTeamsRepository');
const getTeamsRoute = require('./Infrastructure/TeamsRoute');

function createTeamsModule({ repository = new InMemoryTeamsRepository() } = {}) {
    const getTeams = new GetTeams(repository);

    return {
        router: getTeamsRoute(getTeams),
    };
}

module.exports = createTeamsModule;
