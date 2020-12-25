<template>
  <div class="score-board">
    <div class="team-name team1">
      {{ team1 }}
    </div>
    <score-container class="score-container score" :activated="atStakeActivated" :zero="forceAtStakeZero" :score="atStakeScore" />
    <div class="team-name team2">
      {{ team2 }}
    </div>
    <div class="question-container">
      {{ question }}
    </div>
    <score-container class="score-container team1" :activated="team1Activated" :score="team1Score" />
    <feud-board
      class="board"
      :answers="answers"
      @clickAnswer="clickAnswer"
    />
    <score-container class="score-container team2" :activated="team2Activated" :score="team2Score" />
    <div class="spacer none1" />
    <div class="spacer none2" />
  </div>
</template>
<script>
import FeudBoard from './FeudBoard.vue'
import ScoreContainer from './ScoreContainer.vue'
export default {
  props: {
    question: String,
    team1: String,
    team2: String,
    team1Score: Number,
    team2Score: Number,
    scoringFilter: Function,
    answers: Array,
    forceAtStakeZero: Boolean,
    multiplier: Number,
    atStakeActivated: Boolean,
    team1Activated: Boolean,
    team2Activated: Boolean,
  },
  data: function() {
    return {
      
    }
  },
  methods: {
    clickAnswer: function(a) {
      this.$emit('clickAnswer', a);
    }
  },
  computed: {
    atStakeScore: function() {
      let score = this.answers
        .filter(answer => this.scoringFilter(answer))
        .map(answer => answer.value)
        .reduce((result, val) => result + (val * this.multiplier), 0);
      this.$emit('updateScore', score);
      return score;
    }
  },
  components: {
    FeudBoard,
    ScoreContainer
  }
}
</script>
<style lang="scss" scoped>
.score-board {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 20px;
  align-items: center;
  background-color: rgb(233, 229, 217);
  padding: 20px;
  margin-bottom: 5px;

  grid-template-areas: "t1name  score    t2name"
                       "none1   question none2"
                       "t1score board    t2score";

  @media only screen and (max-width: 800px) {
  
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "score    score"
                         "question question"
                         "board    board"
                         "t1name   t1score"
                         "t2name   t2score";
  }
}
.board {
  grid-area: board;
}
.team-name {
  text-align: center;
  font-size: 1.5em;
  &.team1 {
    grid-area: t1name;
  }
  &.team2 {
    grid-area: t2name;
  }
}
.spacer {
  &.none1 {
    grid-area: none1;
  }
  &.none2 {
    grid-area: none2;
  }
}
.question-container {
  text-align: center;
  grid-area: question;
}
.score-container {
  &.score {
    grid-area: score;
  }
  &.team1 {
    grid-area: t1score;
  }
  &.team2 {
    grid-area: t2score;
  }
}
</style>