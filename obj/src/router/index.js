import Vue from 'vue'
import Router from 'vue-router'
import demo1 from '@/components/demo1'
import demo2 from '@/components/demo2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo1',
      component: demo1
    },
    {
      path: '/2',
      name: 'demo2',
      component: demo2
    }
  ]
})
