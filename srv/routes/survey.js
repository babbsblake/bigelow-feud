import express from 'express';
import surveys from '../data/surveys.json';
import { validateNotNull, getSurvey } from '../utils/requestUtils.js';

let router = express.Router();

// here the route is "/" but since it was added to the base app instance at /survey, the
// route is actually "/survey". You can add deeper chains here too. 
router.get('/', (req, res) => {
  res.json(surveys);
})

// called from the control page, resets the feud view based on the answers for the given
// survey via a socket update. The multiplier request param is used for double/triple rounds.
router.post('/begin', (req, res) => {
  let sid = validateNotNull(req.body.sid, 'sid', res);
  let multiplier = req.body.multiplier || 1; // default to 1 if not supplied

  let surveyInQuestion = getSurvey(sid);
  if (surveyInQuestion == undefined) {
    res.status(400).send(`Invalid input: sid ${sid} not found.`);
  }
  
  console.log(`Beginning new round with sid=${sid} and multiplier=${multiplier}`);

  // emit survey information to socket to update the feud view.
  req.socket.emit('beginSurvey', surveyInQuestion, multiplier);

  res.json({
    survey: surveyInQuestion,
    multiplier: multiplier
  });
})

// called from the control page when the player answers and the host clicks on the accepted answer. 
// Reveals the given answer on the feud screen via a socket update. Feud screen automatically
// updates the “at-stake” score at the top of the screen.
router.post('/reveal', (req, res) => {
  let answerNum = validateNotNull(req.body.answerNum, 'answerNum', res);

  console.log(`Revealing answerNum=${answerNum}`);

  // emit reveal information to socket to update the feud view.
  req.socket.emit('reveal', answerNum);

  res.sendStatus(200);
})

// called from the control page to complete this survey round. “at-stake” points are added to the
// selected team’s total.
router.post('/score', (req, res) => {
  let team = validateNotNull(req.body.team, 'team', res);
  console.log(`Scoring for team ${team}`);
  req.socket.emit('score', team);
  res.sendStatus(200);
})

router.post('/showX', (req, res) => {
  let howMany = req.body.howMany || 1;
  console.log(`Showing ${howMany} X on feud view.`);
  req.socket.emit('showX', howMany);
  res.sendStatus(200);
})

export default router;