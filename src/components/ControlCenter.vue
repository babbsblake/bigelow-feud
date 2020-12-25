<template>
  <div class="control-center">
    <team-selector @submit="beginNewGame"/>
    <survey-selector :surveys="surveys" @select="beginSurvey"/>
    <div class="flex">
      <div>Stop sounds on feud view: </div>
      <button @click="stopSound">Stop Sounds</button>
    </div>
    <div class="force-update-score-container">
      <div>Force update scores: </div>
      <input type="text" v-model="team1ForceScore"/>
      <input type="text" v-model="team2ForceScore"/>
      <button @click="forceUpdateScores">FORCE update scores</button>
    </div>
    <div class="force-update-score-container">
      <div>End the game: </div>
      <button @click="gameOver">End game</button>
    </div>
    <score-board
      :question="question"
      :team1="team1"
      :team2="team2"
      :team1Score="team1Score"
      :team2Score="team2Score"
      :scoringFilter="answer => answer.selected"
      :answers="answers"
      :multiplier="roundMultiplier"
      :atStakeActivated="atStakeActivated"
      :team1Activated="team1Activated"
      :team2Activated="team2Activated"
      @updateScore="updateAtStakeScore"
      @clickAnswer="flipAnswer"
    />
    <div class="scoring-controls">
      <div class="team">
        <button class="score" @click="scoreTeam1">Add score to team 1</button>
        <button class="activate" @click="activate(1)">Activate team 1</button>
      </div>
      <div class="x-container">
        <button @click="showX(1)">X</button>
        <button @click="showX(2)">XX</button>
        <button @click="showX(3)">XXX</button>
      </div>
      <div class="team">
        <button class="activate" @click="activate(2)">Activate team 2</button>
        <button class="score" @click="scoreTeam2">Add score to team 2</button>
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
      team1ForceScore: 0,
      team2ForceScore: 0,
      atStakeScore: 0,
      surveys: [], // will be populated by a /surveys GET call in mounted
      answers: [], // populated when a survey is selected and new round is successfully started
      roundMultiplier: 1,
      atStakeActivated: false,
      team1Activated: false,
      team2Activated: false,
    }
  },
  methods: {
    beginSurvey: function(survey, multiplier) {
      console.log(`selected survey number ${survey.sid} and multiplier ${multiplier} to begin next round.`);
      this.roundMultiplier = multiplier;
      API.post('/survey/begin', { sid: survey.sid, multiplier: multiplier }).then(res => {
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
    activate: function(team) {
      API.post('/game/activate', {team: team}).then(res => {
        if (res.status == 200) {
          if (team == 1) {
            this.team1Activated = !this.team1Activated;
          } else {
            this.team2Activated = !this.team2Activated;
          }
        } else {
          console.log(res);
        }
      })
    },
    showX: function(howMany) {
      API.post('/survey/showX', { howMany: howMany }).then(res => {
        if (res.status != 200) {
          console.log(res);
        }
      })
    },
    forceUpdateScores: function() {
      if (confirm(`Are you sure you want to force update scores to ${this.team1ForceScore} and ${this.team2ForceScore}?`)) {
        API.post('/game/forceUpdateScore', {team1: this.team1ForceScore, team2: this.team2ForceScore}).then(res => {
          if (res.status != 200) {
            console.log(res);
          } else {
            this.team1Score = this.team1ForceScore;
            this.team2Score = this.team2ForceScore;
          }
        })
      }
    },
    gameOver: function() {
      if (confirm(`Are you sure you want to end the game?`)) {
        API.post('/game/end').then(res => {
          if (res.status != 200) {
            console.log(res);
          }
        })
      }
    },
    stopSound: function() {
      API.post('/game/stopSound').then(res => {
        if (res.status != 200) {
          console.log(res);
        }
      })
    },
  },
  components: {
    TeamSelector,
    SurveySelector,
    ScoreBoard
  }
}
</script>

<style lang="scss" scoped>
.force-update-score-container {
  display: flex;
  column-gap: 5px;
  margin-bottom: 5px;

  button {
    color: red;
  }
}
.scoring-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .team {
    display: flex;
    column-gap: 5px;
    .score {
      color: green;
    }
    .activate {
      color: rgb(153, 153, 12);
    }
  }
}
.x-container {
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
}
.flex {
  display: flex;
  column-gap: 5px;
  margin-bottom: 5px;
}
</style>