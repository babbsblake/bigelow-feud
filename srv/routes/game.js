import express from 'express';
import { validateNotNull } from '../utils/requestUtils.js';

let router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: "you called game route!"
  })
})

router.post('/new', (req, res) => {
  let team1 = validateNotNull(req.body.team1, 'team1', res);
  let team2 = validateNotNull(req.body.team2, 'team2', res);

  console.log(`starting a new game with team1 ${team1} and team2 ${team2}.`);

  req.socket.emit('beginGame', team1, team2);

  res.sendStatus(200);
})

export default router;