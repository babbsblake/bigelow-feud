<template>
  <div id="app">
    <h1>bigelow-feud</h1>
    <router-view/>
  </div>
</template>

<script>
import API from 'src/utils/API.js';

export default {
  name: 'App',
  methods: {
    makeSurveyRequest: function() {
      API.get('/survey').then(res => {
        console.log(res);
      })
    },
    makeGameRequest: function() {
      API.get('/game').then(res => {
        console.log(res);
      })
    }
  },
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e51;
}
</style>
