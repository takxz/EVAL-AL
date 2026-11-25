class GetTeams{
    constructor(teamsRepository){
        this.teamsRepository = teamsRepository;
    }

    async execute(){
        const teams = await this.teamsRepository.findAll();

        return teams.map(team => ({
            id: team.id,
            name: team.name
        }));
    }
}

module.exports = GetTeams;
