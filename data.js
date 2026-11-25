const teams = [
  { id: 1, name: 'Shadow Wolves' },
  { id: 2, name: 'Pixel Warriors' },
  { id: 3, name: 'Cyber Phoenix' },
  { id: 4, name: 'Dark Knights' },
  { id: 5, name: 'Neon Titans' },
  { id: 6, name: 'Ghost Squad' },
];

const matches = [
  { id: 1, team1Id: 1, team2Id: 2, scoreTeam1: 3, scoreTeam2: 1, status: 'completed' },
  { id: 2, team1Id: 3, team2Id: 4, scoreTeam1: 2, scoreTeam2: 2, status: 'completed' },
  { id: 3, team1Id: 5, team2Id: 6, scoreTeam1: 0, scoreTeam2: 1, status: 'completed' },
  { id: 4, team1Id: 1, team2Id: 3, scoreTeam1: null, scoreTeam2: null, status: 'pending' },
  { id: 5, team1Id: 2, team2Id: 5, scoreTeam1: null, scoreTeam2: null, status: 'pending' },
  { id: 6, team1Id: 4, team2Id: 6, scoreTeam1: null, scoreTeam2: null, status: 'pending' },
];

module.exports = { teams, matches, ranking: [] };
