<template>
  <div class="score-container">
    {{ score }}
  </div>
</template>
<script>
export default {
  props: {
    score: Number
  },
  data: function() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.score-container {
  margin: 0 auto;
  height: 50px;
  width: 100px;
  padding: 15px 25px;
  border-radius: 3px;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 2em;
  box-shadow:
    inset 0px 0px 0px 6px rgb(85, 85, 85),
    inset 0px 0px 2px 8px rgb(126, 126, 126);
  background-color: rgb(24, 87, 235);
}
</style>