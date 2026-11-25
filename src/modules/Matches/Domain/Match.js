class Match{
    constructor(id, team1Id, team2Id, scoreTeam1, scoreTeam2, status){
        this.id = id;
        this.team1Id = team1Id;
        this.team1Id = team2Id;
        this.scoreTeam1 = scoreTeam1;
        this.scoreTeam2 = scoreTeam2;
        this.status = status;
        this.changeName(firstname,  lastname);
    }
}

module.exports = Match;