<template>
  <div class="feud-board">
    <feud-tile
      v-for="(answer, index) in answers"
      :key="answer.answer"
      :answerNum="index + 1"
      :answer="answer.answer"
      :value="answer.value"
      :hidden="answer.hidden"
      :selected="answer.selected"
      @click.native="() => clickAnswer(answer, index)"
    />
  </div>
</template>
<script>
import FeudTile from './FeudTile.vue'
export default {
  props: {
    // answers: [
    //   {
    //     answerNum: 1
    //     answer: "New car",
    //     value: 26,
    //     hidden: true,
    //   }
    // ]
    answers: Array
  },
  data: function() {
    return {
      
    }
  },
  methods: {
    clickAnswer: function(answer, index) {
      this.$emit('clickAnswer', { answer: answer, index: index } );
    }
  },
  components: {
    FeudTile
  }
}
</script>
<style lang="scss" scoped>
.feud-board {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-auto-flow: column;
  column-gap: 8px;
  row-gap: 5px;

  border-radius: 4px;
  padding: 8px;
  box-shadow:
    inset 0px 0px 0px 2px rgb(85, 85, 85),
    inset 0px 0px 0px 4px rgb(255, 177, 31),
    inset 0px 0px 0px 6px rgb(85, 85, 85);
  background-color: rgb(40, 40, 40);

}
</style>
