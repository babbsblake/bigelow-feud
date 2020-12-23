import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'src/views/Home.vue'
import FeudView from 'src/views/FeudView.vue'
import CommandView from 'src/views/CommandView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feud',
    name: 'Feud',
    component: FeudView
  },
  {
    path: '/command',
    name: 'Command',
    component: CommandView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
