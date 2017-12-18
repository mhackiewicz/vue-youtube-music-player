import Vue from 'vue'
import Router from 'vue-router'
import SearchList from '@/components/SearchList'
import PlayLists from '@/components/PlayLists'
import Player from '@/components/Player'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchList',
      component: SearchList
    },
    {
      path: '/play-lists',
      name: 'PlayLists',
      component: PlayLists
    },
    {
      path: '/player/:videoId',
      name: 'Player',
      component: Player,
      props: true
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm     
    },
    {
      path: '/register',
      name: 'RegisterForm',
      component: RegisterForm     
    }      
  ]
})
