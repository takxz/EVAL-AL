const express = require('express');
const data = require('./data');
const createTeamsModule = require('./src/modules/Teams');
const { CreateMatch, ResultMatch, GetMatches } = require('./src/modules/Matches/Infrastructure/MatchRoutes');


const app = express();
app.use(express.json());

function recalculateRanking() {
  const standings = data.teams.map((team) => ({
    teamId: team.id,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
  }));

  for (const match of data.matches) {
    if (match.status !== 'completed') continue;

    const team1 = standings.find((entry) => entry.teamId === match.team1Id);
    const team2 = standings.find((entry) => entry.teamId === match.team2Id);
    team1.played += 1;
    team2.played += 1;

    if (match.scoreTeam1 === match.scoreTeam2) {
      team1.draws += 1;
      team2.draws += 1;
      team1.points += 1;
      team2.points += 1;
    } else {
      const winner = match.scoreTeam1 > match.scoreTeam2 ? team1 : team2;
      const loser = winner === team1 ? team2 : team1;
      winner.wins += 1;
      winner.points += 3;
      loser.losses += 1;
    }
  }

  standings.sort((first, second) => {
    const firstName = data.teams.find((team) => team.id === first.teamId).name;
    const secondName = data.teams.find((team) => team.id === second.teamId).name;
    return second.points - first.points || firstName.localeCompare(secondName, 'fr');
  });
  data.ranking = standings;
}

async function notifyTeams(match) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const team1 = data.teams.find((team) => team.id === match.team1Id);
  const team2 = data.teams.find((team) => team.id === match.team2Id);
  console.log(
    `Notification à ${team1.name} et ${team2.name} : match ${match.id} terminé, ` +
    `score ${match.scoreTeam1} - ${match.scoreTeam2}.`,
  );
}

app.use('/teams', createTeamsModule().router);

app.use('/matches', GetMatches());
app.use('/matches', CreateMatch());
app.use('/matches/:id/result', ResultMatch());


app.get('/ranking', (req, res) => {
  res.json(data.ranking);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable.' });
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Le corps de la requête doit être un JSON valide.' });
  }
  const status = error.status >= 400 && error.status < 500 ? error.status : 500;
  res.status(status).json({ error: status === 500 ? 'Erreur interne du serveur.' : error.message });
});

recalculateRanking();
app.listen(3000, () => {
  console.log('Arena Tournament disponible sur http://localhost:3000');
});
