<template>
  <div class="feud-board">
    <feud-tile
      v-for="(answer, index) in answers"
      class="feud-tile hidden"
      :key="answer.answer"
      :answerNum="index + 1"
      :answer="answer.answer"
      :value="answer.value"
      :hidden="false"
    />
  </div>
</template>
<script>
import FeudTile from './FeudTile.vue'
export default {
  props: {
    // answers: [
    //   {
    //     "answer": "New car",
    //     "value": 26
    //   }
    // ]
    answers: Array
  },
  data: function() {
    return {
      
    }
  },
  methods: {
    // flipHidden: function(answer) {
    //   console.log(answer);
    //   if (answer.hidden == null || answer.hidden == undefined) {
    //     answer.hidden = false;
    //   } else {
    //     answer.hidden = !answer.hidden;
    //   }
    // }
  },
  components: {
    FeudTile
  }
}
</script>
<style lang="scss" scoped>
.feud-board {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-auto-flow: column;
}
</style>
