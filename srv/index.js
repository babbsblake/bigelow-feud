import express from 'express';
import cors from 'cors';
import surveyHandler from './routes/survey.js';
import gameHandler from './routes/game.js';
// import socketIO from "socket.io";

export default (app, http) => {
  app.use(express.json());
  app.use(cors());

  // set up routes here
  app.use('/survey', surveyHandler);
  app.use('/game', gameHandler);

  // 
  // optional support for socket.io
  // 
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
}
