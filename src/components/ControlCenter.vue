<template>
  <div class="control-center">
    <team-selector @submit="beginNewGame"/>
    <survey-selector :surveys="surveys" @select="beginSurvey"/>
    <score-board
      :question="question"
      :team1="team1"
      :team2="team2"
      :team1Score="team1Score"
      :team2Score="team2Score"
      :scoringFilter="answer => answer.selected"
      :answers="answers"
      @updateScore="updateAtStakeScore"
      @clickAnswer="flipAnswer"
    />
    <div class="scoring-controls">
      <div class="team1">
        <button @click="scoreTeam1">Add score to team 1</button>
      </div>
      <div class="x-container">
        <button @click="showX">X</button>
        <button @click="showXX">XX</button>
        <button @click="showXXX">XXX</button>
      </div>
      <div class="team2">
        <button @click="scoreTeam2">Add score to team 2</button>
      </div>
    </div>
  </div>
</template>
<script>
import API from 'src/utils/API.js';
import SurveySelector from 'src/components/SurveySelector.vue';
import TeamSelector from 'src/components/TeamSelector.vue';
import ScoreBoard from 'src/components/ScoreBoard.vue';

export default {

  mounted: function() {
    API.get('/survey').then(res => {
      this.surveys = res.data.surveys;
    });
  },
  data: function() {
    return {
      question: "",
      team1: "",
      team2: "",
      team1Score: 0,
      team2Score: 0,
      atStakeScore: 0,
      surveys: [], // will be populated by a /surveys GET call in mounted
      answers: [], // populated when a survey is selected and new round is successfully started
    }
  },
  methods: {
    beginSurvey: function(survey) {
      console.log(`selected survey number ${survey.sid} to begin next round.`);
      API.post('/survey/begin', { sid: survey.sid }).then(res => {
        if (res.status == 200) {
          this.question = survey.question;
          this.answers = survey.answers.map(answer => {
            return { ...answer, hidden: false, selected: false }
          });
        } else {
          console.log(res);
        }
      });
    },
    flipAnswer: function(a) {
      API.post('/survey/reveal', { answerNum: a.index + 1 }).then(res => {
        if (res.status == 200) {
          let existingAnswer = this.answers[a.index];
          existingAnswer.selected = !existingAnswer.selected;
          this.answers.splice(a.index, 1, {...existingAnswer});
        } else {
          console.log(res);
        }
      })
    },
    beginNewGame: function(teams) {
      this.team1 = teams.team1;
      this.team2 = teams.team2;
      this.team1Score = 0;
      this.team2Score = 0;

      API.post('/game/new', {team1: this.team1, team2: this.team2}).then(res => {
        if (res.status != 200) {
          console.log(res);
        }
      })
    },
    updateAtStakeScore: function(newScore) {
      this.atStakeScore = newScore;
    },
    scoreTeam1: function() {
      this.team1Score += this.atStakeScore;
      this.answers.map(answer => {
        let existingAnswer = answer;
        answer.selected = false;
        return existingAnswer;
      })
      API.post('/survey/score', {team: 1}).then(res => {
        if (res.status != 200) {
          console.log(res);
        }
      })
    },
    scoreTeam2: function() {
      this.team2Score += this.atStakeScore;
      this.answers.map(answer => {
        let existingAnswer = answer;
        answer.selected = false;
        return existingAnswer;
      })
      API.post('/survey/score', {team: 2}).then(res => {
        if (res.status != 200) {
          console.log(res);
        }
      })
    },
    showX: function() {

    },
    showXX: function() {

    },
    showXXX: function() {

    }
  },
  components: {
    TeamSelector,
    SurveySelector,
    ScoreBoard
  }
}
</script>

<style lang="scss" scoped>
.scoring-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.x-container {
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
}
</style>