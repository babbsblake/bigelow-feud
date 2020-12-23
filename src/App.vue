<template>
  <div id="app">
    <h1>secret game project</h1>
    <ControlBoard />
    <br>
    <button @click="makeSurveyRequest">make survey request</button>
    <br>
    <button @click="makeGameRequest">make game request</button>
  </div>
</template>

<script>
import API from 'src/utils/API.js';
import ControlBoard from 'src/components/ControlBoard.vue'

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
    ControlBoard
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
