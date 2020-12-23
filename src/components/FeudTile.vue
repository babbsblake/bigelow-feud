<template>
  <div class="feud-tile" :class="{hidden: hidden}">
    {{ tileText }}
  </div>
</template>
<script>
export default {
  props: {
    answer: String,
    value: Number,
    answerNum: Number,
    hidden: Boolean
  },
  data: function() {
    return {
      
    }
  },
  computed: {
    tileText: function() {
      return this.hidden ? this.answerNum : `${this.answer} - ${this.value}`;
    }
  }
}
</script>
<style lang="scss" scoped>
.feud-tile {
  border: 2px solid #444444;
  text-align: center;
  color: white;
  padding: 5px;

  &.hidden {
    background-color: #3665d1;
  }
}
</style>