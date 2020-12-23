<template>
  <div class="survey-selector">    
    <label for="cars">Select a survey:</label>
    <select v-model="selectedSurvey" name="surveys" id="surveys">
      <option disabled>Select a survey...</option>
      <option
        v-for="survey in surveys"
        :value="survey"
        :key="survey.sid"
      >
        {{survey.question}}
      </option>
    </select>
    <button @click="submitSurvey" :disabled="selectedSurvey == null">Begin round</button>
  </div>
</template>
<script>
// SurveySelector consumes an array of survey questions, then emits a "select" event when
// the user selects a survey from the list. The payload is the entire survey object.
export default {
  props: {
    // surveys: [
    //   { sid: "123", question: "name a thing that your husband ... "},
    //   ...
    // ]
    surveys: Array
  },
  data: function() {
    return {
      selectedSurvey: null
    }
  },
  methods: {
    submitSurvey: function() {
      this.$emit('select', this.selectedSurvey);
    }
  }
}
</script>
<style lang="scss" scoped>
.survey-selector {
  display: flex;
}
</style>