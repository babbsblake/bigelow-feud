<template>
  <div class="team-selector">    
    <div>Select team names: </div>
    <input type="text" v-model="team1" />
    <input type="text" v-model="team2" />
    <button @click="submit" :disabled='team1 == "" || team2 == ""'>Begin new game</button>
  </div>
</template>
<script>
// SurveySelector consumes an array of survey questions, then emits a "select" event when
// the user selects a survey from the list. The payload is the entire survey object.
export default {
  props: {

  },
  data: function() {
    return {
      team1: "",
      team2: ""
    }
  },
  methods: {
    submit: function() {
      this.$emit('submit', { team1: this.team1, team2: this.team2 });
    }
  }
}
</script>
<style lang="scss" scoped>
.team-selector {
  display: flex;
  column-gap: 5px;
  margin-bottom: 5px;
}
</style>