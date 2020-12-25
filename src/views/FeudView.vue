<template>
  <div class="feud-view">
    <div class="x-container">
      <div v-for="(x, index) in numX" :key="index" class="x">X</div>
    </div>
    <score-board
      :question="question"
      :team1="team1"
      :team2="team2"
      :team1Score="team1Score"
      :team2Score="team2Score"
      :scoringFilter="answer => !answer.hidden"
      :answers="answers"
      :forceAtStakeZero="forceAtStakeZero"
      :multiplier="roundMultiplier"
      @updateScore="updateAtStakeScore"
    />
    <div v-if="gameOverText" class="end-game">
      {{ gameOverText }}
    </div>
  </div>
</template>
<script>
import Socket from 'src/utils/Socket.js';
import ScoreBoard from '../components/ScoreBoard.vue';

export default {
  mounted: function() {
    Socket.on('beginGame', (team1, team2) => {
      this.beginGame(team1, team2);
    });
    Socket.on('beginSurvey', (survey, multiplier) => {
      this.beginSurvey(survey, multiplier)
    });
    Socket.on('reveal', answerNum => {
      this.revealAnswer(answerNum);
    });
    Socket.on('score', team => {
      this.score(team);
    });
    Socket.on('showX', howMany => {
      this.showX(howMany);
    });
    Socket.on('forceUpdateScore', (team1, team2) => {
      this.forceUpdateScores(team1, team2);
    });
    Socket.on('gameOver', () => {
      this.gameOver();
    })
  },
  data: function() {
    return {
      question: "",
      team1: "",
      team2: "",
      team1Score: 0,
      team2Score: 0,
      atStakeScore: 0,
      answers: [], // populated when a survey is selected on the command view,
                   // and a socket update is received
      numX: 0,
      forceAtStakeZero: false,
      gameOverText: null,
      roundMultiplier: 1,
    }
  },
  methods: {
    updateAtStakeScore: function(newScore) {
      this.atStakeScore = newScore;
    },
    revealAnswer: function(answerNum) {
      let index = answerNum - 1;
      let existingAnswer = this.answers[index];
      existingAnswer.hidden = false;
      this.answers.splice(index, 1, existingAnswer);
    },
    beginGame: function(team1, team2) {
      this.team1 = team1;
      this.team2 = team2;
      this.team1Score = 0;
      this.team2Score = 0;
      this.gameOverText = null;
    },
    beginSurvey: function(survey, multiplier) {
      this.question = survey.question;
      this.forceAtStakeZero = false;
      this.roundMultiplier = multiplier;
      this.answers = survey.answers.map(answer => {
        return { ...answer, hidden: true, selected: false }
      })
    },
    score: function(team) {
      if (team == 1) {
        this.team1Score += this.atStakeScore;
      } else if (team == 2) {
        this.team2Score += this.atStakeScore;
      } else {
        console.log(`error... got a request from the server to score for team ${team}`);
      }
      this.forceAtStakeZero = true;
    },
    showX: function(howMany) {
      // TODO: play sound effect

      this.numX = howMany;
      setTimeout(() => {
        this.numX = 0;
      }, 3000)
    },
    forceUpdateScores: function(team1, team2) {
      this.team1Score = team1;
      this.team2Score = team2;
    },
    gameOver: function() {
      if (this.team1Score > this.team2Score) {
        this.gameOverText = `Congratulations ${this.team1}, you won!`;
      } else if (this.team2Score > this.team1Score) {
        this.gameOverText = `Congratulations ${this.team2}, you won!`;
      } else {
        this.gameOverText = `It was a tie!! Everyone finish your drink.`;
      }
    }
  },
  components: {
    ScoreBoard
  }
}
</script>
<style lang="scss" scoped>
.feud-view {
  position: relative;
}
.x-container {
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  grid-gap: 20px;
  text-align: center;
  align-items: center;


  .x {
    font-size: 15em;
    font-weight: bold;
    font-family: sans-serif;
    color: red;
    border-radius: 10px;
    padding: 0px 25px;
    box-shadow:
      inset 0px 0px 0px 10px red,
      inset 0px 0px 0px 18px rgb(121, 17, 17),
      0px 4px 8px 4px rgb(49, 4, 4);
    text-shadow:
      0px 8px 0px rgb(121, 17, 17);
    z-index: 3;
  }
}
</style>