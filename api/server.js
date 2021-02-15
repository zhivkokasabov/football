const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const JWT_SECRET_KEY = require('../node_modules/json-server-auth/dist/constants').JWT_SECRET_KEY;
const auth = require('json-server-auth')
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')

server.use(middlewares);
server.use(bodyParser.json());

server.use((req, res, next) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  const { originalUrl } = req;
  const publicEndpoints = ['/userTypes', '/login', '/register', 'playerPositions'];

  if (req.method === 'POST' && publicEndpoints.indexOf(originalUrl) == -1) {
    req.body.userId = getUser(req).id;
  }

  if (publicEndpoints.indexOf(originalUrl) > -1) {
    next();
  } else {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY);

      next() // continue to JSON Server router
    } catch (e) {
      res.sendStatus(401)
    }
  }
})

server.get('/user-tournaments/:id', auth, (req, res, next) => {
  const { db } = req.app;
  const userId = getUser(req).id;
  const tourOrgByUser = db.get('tournaments').value().filter(x => x.userId === userId) || [];
  const teams = db.get('teams').value();
  const tourParticipating = db.get('teamMembers').value()
    .filter(tm => tm.userId === userId);
  const mapMembersToTeam = tourParticipating.map(t => ({
      userId,
      team: teams.find(tm => t.teamId === tm.id)
    }));

  const mapTeamsToTournaments = mapMembersToTeam.reduce((acc, curr) => {
    const teamTournaments = db.get('tournamentParticipants').value().filter(tp => tp.teamId === curr.team.id) || [];

    return acc.concat(teamTournaments)
  }, []);


  const tournaments = mapTeamsToTournaments.reduce((acc, curr) => {
    const tournament = db.get('tournaments').find(t => t.id === curr.tournamentId);

    acc.push(tournament);

    return acc;
  }, []);

  res.json(
    tournaments.concat(tourOrgByUser)
  );
});

server.get('/profile', auth, (req, res, next) => {
  const user = getUser(req);
  const { db } = req.app;

  res.json({
    ...user,
    playerPosition: db.get('playerPositions').find({ id: user.playerPositionId }).value(),
    userType: db.get('userTypes').find({ id: user.userTypeId }).value()
  });
});

function getUser(req) {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  const data = jwt.verify(token, JWT_SECRET_KEY);
  const { db } = req.app;

  return db.get('users').find({ email: data.email }).value();
}

server.db = router.db
server.use(auth);
server.use(router)
server.listen(3000, () => {
})
