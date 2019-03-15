import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import DataTypeSelector from '@/views/DataTypeSelector'
import PasProjectView from '@/views/PasProjectView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dataTypeSelector',
      name: 'dataTypeSelector',
      component: DataTypeSelector
    },
    {
      path: '/pasProjectView',
      name: 'pasProjectView',
      component: PasProjectView
    }
  ]
})
