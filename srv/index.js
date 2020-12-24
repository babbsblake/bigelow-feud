import express from 'express';
import cors from 'cors';
import surveyHandler from './routes/survey.js';
import gameHandler from './routes/game.js';
import socketIO from "socket.io";

export default (app, http) => {
  app.use(express.json());
  app.use(cors());
  let io = socketIO(http);
  // this middleware makes socket available to all routes.
  app.use((req, res, next) => {
    req.socket = io;
    next();
  })

  // serve the public folder, and index.html
  app.use(express.static('dist'));
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });
  app.get('/feud', (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });
  app.get('/command', (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });

  // set up routes here
  app.use('/survey', surveyHandler);
  app.use('/game', gameHandler);

  io.on("connection", socket => {
    console.log(`A user connected with socketId ${socket.id}`);
  });
}
