<template>
  <div class="feud-tile-container">
    <div class="feud-tile-cover" :class="{hidden: hidden}">
      <div class="number">
        {{ answerNum }}
      </div>
    </div>
    <div class="feud-tile-selection" :class="{selected: selected}" />
    <div class="feud-tile" :class="{selected: selected, hidden: hidden}">
      <div class="answer">
        {{ answer }}
      </div>
      <div class="value">
        {{ value }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    answer: String,
    value: Number,
    answerNum: Number,
    hidden: Boolean,
    selected: Boolean
  },
  data: function() {
    return {
      
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
.feud-tile-container {
  position: relative;
}
.feud-tile-cover {
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  background: linear-gradient(rgb(103, 143, 238), rgb(22, 75, 200));
  box-shadow:
    inset 0px 0px 0px 2px rgb(240, 240, 240),
    inset 0px 0px 0px 3px rgb(56, 56, 56),
    inset 1px 1px 1px 3px rgb(165, 165, 165);

  opacity: 0;
  transition: opacity 0.5s;
  
  .number {
    margin: 4px auto;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 2px 1px rgb(240, 240, 240);
    width: 40px;
    height: 30px;
    padding: 5px;
    color: white;
    font-weight: bold;
    background-color: rgb(26, 4, 148);
    border-radius: 20px;
  }

  &.hidden {
    opacity: 1;
  }
}
.feud-tile-selection {
  opacity: 0;
  transition: opacity 0.5s;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: inset 0px 0px 8px 2px yellow;

  &.selected {
    opacity: 1;
  }
}
.feud-tile {
  display: grid;
  grid-template-columns: 1fr 50px;
  text-align: center;
  color: white;
  padding: 4px;

  box-shadow:
    inset 0px 0px 0px 2px rgb(240, 240, 240),
    inset 1px 1px 1px 2px rgb(165, 165, 165);
  background: linear-gradient(rgb(16, 48, 122), rgb(22, 75, 200), rgb(16, 48, 122));

  &.selected .answer {
    color: grey;
  }

  .answer {
    transition: color 0.5s;
    padding: 10px 0px;
  }
  .value {
    background: linear-gradient(rgb(103, 143, 238), rgb(22, 75, 200));
    border-left: 1px solid white;
    padding: 10px 0px;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>