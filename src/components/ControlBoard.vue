<template>
  <div class="control-board">
    Control Board contents here - {{foo}}.
    <survey-selector :surveys="surveys" @select="beginSurvey"/>
    <feud-board v-if="answers.length != 0" :answers="answers" />
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
        this.answers = survey.answers;
      });
    }
  },
  components: {
    SurveySelector,
    FeudBoard
  }
}
</script>

    FeudBoard<style lang="scss" scoped>
.control-board {

}
</style>