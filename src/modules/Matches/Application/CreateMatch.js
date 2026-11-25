class CreateMatch{
    constructor(MatchRepository){
        this.MatchRepository = MatchRepository;
    }

    async execute(){
        const match = await this.MatchRepository.CreateMatch(id);

        if(!match){
            return null;
        }

        return{
            team1Id: match.team1Id,
            team2Id: match.team2Id,
            status: match.status
        }
    }
}

module.exports = CreateMatch;