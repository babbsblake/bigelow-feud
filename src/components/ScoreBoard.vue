<template>
  <div class="score-board">
    <div class="team-name">
      {{ team1 }}
    </div>
    <score-container :score="atStakeScore" />
    <div class="team-name">
      {{ team2 }}
    </div>
    <div class="spacer" />
    <div class="question-container">
      {{ question }}
    </div>
    <div class="spacer" />
    <score-container :score="team1Score" />
    <feud-board
      :answers="answers"
      @clickAnswer="clickAnswer"
    />
    <score-container :score="team2Score" />
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
    answers: Array
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
        .reduce((result, val) => result + val, 0);
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
  grid-template-columns: 1fr 800px 1fr;
  grid-gap: 20px;
  align-items: center;
  background-color: rgb(233, 229, 217);
  padding: 20px;
  margin-bottom: 5px;
}
.team-name {
  text-align: center;
  font-size: 1.5em;
}
.question-container {
  text-align: center;
}
</style>