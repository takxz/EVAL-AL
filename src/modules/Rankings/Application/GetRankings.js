class GetRankings {
    constructor(rankingsRepository) {
        this.rankingsRepository = rankingsRepository;
    }

    async execute() {
        const rankings = await this.rankingsRepository.getRankings();

        if (!rankings) {
            return null
        }

        return {
            // à compélter
        }
    }
}

module.exports = GetRankings;