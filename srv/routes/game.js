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

router.post('/end', (req, res) => {
  console.log(`emitting event to complete the game.`);

  req.socket.emit('gameOver');

  res.sendStatus(200);
})

router.post('/stopSound', (req, res) => {
  console.log(`emitting event to stop sounds.`);
  req.socket.emit('stopSound');
  res.sendStatus(200);
})

router.post('/forceUpdateScore', (req, res) => {
  let team1 = validateNotNull(req.body.team1, 'team1', res);
  let team2 = validateNotNull(req.body.team2, 'team2', res);

  console.log(`forcing update of scores for team1: ${team1} and team2: ${team2}`);

  req.socket.emit('forceUpdateScore', team1, team2);

  res.sendStatus(200);
})

router.post('/activate', (req, res) => {
  let team = validateNotNull(req.body.team, 'team', res);

  console.log(`activating team ${team}`);
  req.socket.emit('activate', team);
  res.sendStatus(200);
})

export default router;