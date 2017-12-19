// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Firebase from 'firebase'
import '@/firebase';
import Vue from 'vue'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import YoutubePlugin from './plugins/youtube-plugin'
import('../node_modules/vuetify/dist/vuetify.min.css')

//Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(YoutubePlugin,{apiKey:'AIzaSyCg6jejqImtfpqHrb2rPsCuq3G6bRno6hQ'})


const store = new Vuex.Store({
  state: {
    searchText: ''
  },
  mutations: {
    changeSearchText (state, new_text) {   
      state.searchText = new_text;
    }
  },
  actions: {
    changeSearchText ({commit},new_text) {
      commit('changeSearchText',new_text)
    }
  },
  getters: {
    getSearchText: state => {
      return state.searchText
    }
  }

})

/* eslint-disable no-new */
Firebase.auth().onAuthStateChanged(function(user) {
	new Vue({
	  el: '#app',
	  router,
	  store: store,
	  template: '<App/>',
	  components: { App }
	})
});
