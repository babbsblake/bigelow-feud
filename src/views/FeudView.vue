<template>
  <div class="feud-view">
    <score-board
      :question="question"
      :team1="team1"
      :team2="team2"
      :team1Score="team1Score"
      :team2Score="team2Score"
      :scoringFilter="answer => !answer.hidden"
      :answers="answers"
      @updateScore="updateAtStakeScore"
    />
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
    Socket.on('beginSurvey', (survey) => {
      this.beginSurvey(survey)
    });
    Socket.on('reveal', answerNum => {
      this.revealAnswer(answerNum);
    });
    Socket.on('score', team => {
      this.score(team);
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
    },
    beginSurvey: function(survey) {
      this.question = survey.question;
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
      this.answers = [];
      this.question = "";
    }
  },
  components: {
    ScoreBoard
  }
}
</script>
<style lang="scss" scoped>

</style>