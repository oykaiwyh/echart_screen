import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BMap from '../views/BMap.vue'
import Liquidfill from '../views/Liquidfill.vue'
import wordclound from '../views/wordclound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bmap',
    name: 'bmap',
    component: BMap
  },
  {
    path: '/liquid',
    name: 'liquid',
    component: Liquidfill
  },
  {
    path: '/wordclound',
    name: 'wordclound',
    component: wordclound
  }

]

const router = new VueRouter({
  routes
})

export default router
