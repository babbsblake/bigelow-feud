<template>
  <div class="control-board">
    <survey-selector :surveys="surveys" @select="beginSurvey"/>
    <feud-board
      v-if="answers.length != 0"
      :answers="answers"
      @clickAnswer="flipAnswer"
    />
  </div>
</template>
<script>
import API from 'src/utils/API.js';
import SurveySelector from 'src/components/SurveySelector.vue';
import FeudBoard from './FeudBoard.vue';

export default {

  mounted: function() {
    API.get('/survey').then(res => {
      this.surveys = res.data.surveys;
    });
  },
  data: function() {
    return {
      foo: "bar",
      surveys: [], // will be populated by a /surveys GET call in mounted
      answers: [], // populated when a survey is selected and new round is successfully started
    }
  },
  methods: {
    beginSurvey: function(survey) {
      console.log(`selected survey number ${survey.sid} to begin next round.`);
      API.post('/survey/begin', { sid: survey.sid }).then(res => {
        console.log(res);
        this.answers = survey.answers.map(answer => {
          return { ...answer, hidden: false, selected: false }
        });
      });
    },
    flipAnswer: function(a) {
      let existingAnswer = this.answers[a.index];
      existingAnswer.hidden = !existingAnswer.hidden;
      this.answers.splice(a.index, 1, {...existingAnswer})
    }
  },
  components: {
    SurveySelector,
    FeudBoard
  }
}
</script>

<style lang="scss" scoped>
.control-board {

}
</style>