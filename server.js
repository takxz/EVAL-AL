const express = require('express');
const data = require('./data');
const createTeamsModule = require('./src/modules/Teams');
require('./src/modules/Notifications');

const createRankingsModule = require('./src/modules/Rankings')
const teamsModule = createTeamsModule()
const { CreateMatch, ResultMatch, GetMatches } = require('./src/modules/Matches/Infrastructure/MatchRoutes');

const app = express();
app.use(express.json());

const rankingsModule = createRankingsModule({
  getTeams: teamsModule.getTeams,
  getMatches: () => data.matches,
});

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
app.use('/teams', teamsModule.router)
app.use('/ranking', createRankingsModule().router)
app.use('/ranking', rankingsModule.router)

app.use('/matches', GetMatches());
app.use('/matches', CreateMatch());
app.use('/matches/:id/result', ResultMatch());


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
