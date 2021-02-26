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

server.get('/tournaments/:id', auth, (req, res, next) => {
  const { db } = req.app;

  res.json(
    db.get('tournaments').value().find(t => t.id == req.params.id)
  );
});

server.get('/tournaments/:id/participants', auth, (req, res, next) => {
  const { db } = req.app;
  const teams = db.get('teams').value();
  const result = db.get('tournamentParticipants')
    .value()
    .filter(tp => tp.tournamentId == req.params.id)
    .map(tp => ({
      ...tp,
      team: tp.teamId ? teams.find(t => t.id == tp.teamId) : null
    }));

  res.json(
    result
  );
})

server.post('/tournaments', auth, (req, res, next) => {
  const user = getUser(req);
  const { db } = req.app;
  const { body } = req;

  const nextId = db.get('tournaments').value().length + 1;
  insert(db, 'tournaments', {
    ...body,
    id: nextId
  });

  const groupsChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const groups = Math.ceil(body.teamsCount / body.groupSize);

  for (let ii = 0; ii < groups; ii++) {
    const groupName = groupsChars[ii];
    for (let jj = 1; jj <= body.groupSize; jj++) {
      const nextParticipantId = db.get('tournamentParticipants').value().length + 1;
      const teamSequenceId = ii * body.groupSize + jj;
      insert(db, 'tournamentParticipants', {
        tournamentId: nextId,
        teamId: null,
        teamSequenceId: teamSequenceId,
        group: groupName,
        id: nextParticipantId
      });

      for (let kk = jj, c = 1; kk < body.groupSize; kk++, c++) {
        insert(db, 'tournamentMatches', {
          tournamentId: nextId,
          homeTeamSequenceId: teamSequenceId,
          awayTeamSequenceId: teamSequenceId + c,
          homeTeamId: null,
          awayTeamId: null,
          group: groupName,
          startTime: body.firstMatchStartsAt,
          date: body.startDate
        });
      }
    }
  }

  res.json(db.get('tournaments').find(t => t.id = nextId));
});

function insert(db, collection, data) {
  const table = db.get(collection);

  table.push(data).write();
}

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
