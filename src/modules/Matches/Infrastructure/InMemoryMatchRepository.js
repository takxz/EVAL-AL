const MatchRepository = require('../Application/Port/MatchRepository.js');
const Match = require('../Domain/Match.js');

class InMemoryMatchRepository extends MatchRepository{
    constructor(){
        super();
        this.match = new Map([
            [1, new Match(1, 1, 2, 3, 1, 'completed')],
            [2, new Match(2, 3, 4, 2, 2, 'completed')],
            [3, new Match(3, 5, 6, 0, 1, 'completed')],
            [4, new Match(4, 1, 3, null, null, 'pending')],
            [5, new Match(5, 2, 5, null, null, 'pending')],
            [6, new Match(6, 4, 6, null, null, 'pending')],
        ])
    }

    GetAll(){
        return Array.from(this.match.values());
    }
}

module.exports = InMemoryMatchRepository;