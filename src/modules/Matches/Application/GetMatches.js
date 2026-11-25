class GetMatches{
    constructor(MatchRepository){
        this.MatchRepository = MatchRepository;
    }

    async execute(){
        const match = await this.MatchRepository.getAll();

        if(!match){
            return null;
        }

        return{
            team1Id: match.team1Id,
            team2Id: match.team2Id,
            scoreTeam1: match.scoreTeam1,
            scoreTeam2: match.scoreTeam2,
            status: match.status
        }
    }
}

module.exports = GetMatches;