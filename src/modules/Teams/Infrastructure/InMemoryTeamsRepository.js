const TeamsRepository = require('../Application/Port/TeamsRepository')
const Team = require('../Domain/Teams')

class InMemoryTeamsRepository extends TeamsRepository {
    constructor() {
        super()
        this.teams = new Map([
            [1, new Team(1, 'Shadow Wolves')],
            [2, new Team(2, 'Pixel Warriors')],
            [3, new Team(3, 'Cyber Phoenix')],
            [4, new Team(4, 'Dark Knights')],
            [5, new Team(5, 'Neon Titans')],
            [6, new Team(6, 'Ghost Squad')],
        ])
    }

    findAll() {
        return Array.from(this.teams.values())
    }
}

module.exports = InMemoryTeamsRepository
