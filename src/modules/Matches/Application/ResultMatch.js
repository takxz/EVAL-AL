class ResultDrawMatches{
    constructor(MatchRepository){
        this.MatchRepository = MatchRepository;
    }

    async execute(id){
        const match = await this.MatchRepository.ResultDrawMatch(id);

        if(!match){
            return null;
        }

        return{
            team1Id: match.team1Id,
            team2Id: match.team2Id,
            scoreTeam1: match.scoreTeam1,
            scoreTeam2: match.scoreTeam2,
        }
    }
}

module.exports = ResultDrawMatches;