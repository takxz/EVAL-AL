const express = resuire('express');

function CreateMatch(){
    app.post('/matches', (req, res) => {
        const { team1Id, team2Id } = req.body || {};
        if (!Number.isSafeInteger(team1Id) || !Number.isSafeInteger(team2Id)) {
        return res.status(400).json({ error: 'Les identifiants des équipes doivent être des entiers.' });
        }
        const team1 = data.teams.find((team) => team.id === team1Id);
        const team2 = data.teams.find((team) => team.id === team2Id);
        if (!team1 || !team2) {
            return res.status(404).json({ error: 'Une des équipes est introuvable.' });
        }
        if (team1Id === team2Id) {
            return res.status(400).json({ error: 'Une équipe ne peut pas jouer contre elle-même.' });
        }

        const match = {
            id: Math.max(0, ...data.matches.map((entry) => entry.id)) + 1,
            team1Id,
            team2Id,
            scoreTeam1: null,
            scoreTeam2: null,
            status: 'pending',
        };
        data.matches.push(match);
        res.status(201).json(match);
    });
}

function GetMatches(){
    app.get('/matches', (req, res) => {
        res.json(data.matches);
    });
}

function ResultMatch(){
    app.post('/matches/:id/result', async (req, res) => {
        const match = data.matches.find((entry) => String(entry.id) === req.params.id);
        if (!match) {
            return res.status(404).json({ error: 'Match introuvable.' });
        }
        if (match.status === 'completed') {
            return res.status(409).json({ error: 'Le résultat de ce match a déjà été enregistré.' });
        }

        const { scoreTeam1, scoreTeam2 } = req.body || {};
        if (!Number.isSafeInteger(scoreTeam1) || scoreTeam1 < 0 ||
            !Number.isSafeInteger(scoreTeam2) || scoreTeam2 < 0) {
            return res.status(400).json({ error: 'Les scores doivent être des entiers positifs ou nuls.' });
        }

        match.scoreTeam1 = scoreTeam1;
        match.scoreTeam2 = scoreTeam2;
        match.status = 'completed';
        recalculateRanking();
        await notifyTeams(match);
        res.json(match);
    });
}

module.exports = {CreateMatch, ResultMatch, GetMatches};