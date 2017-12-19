<template>
 <v-app id="app" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile>
         <h3>Vue Youtube Music Player</h3>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click.stop="drawer = !drawer"><router-link  :to="{name: 'SearchList'}">Main</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="" v-if="isLogin">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title@click.stop="drawer = !drawer"><router-link :to="{name: 'PlayLists'}">Play lists</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="" v-if="!isLogin">
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title@click.stop="drawer = !drawer"><router-link :to="{name: 'LoginForm'}">Login</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="" v-if="isLogin">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-on:click="logout">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar  color="red" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-layout row align-center style="max-width: 650px;margin-left: 30px;">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="searchClick"
          class="white--text"
          v-model="searchText"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
         <router-view :key="$route.fullPath"></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; github.com/mhackiewicz </span>
    </v-footer>
  </v-app>
</template>

<script>

import { mapActions} from 'vuex'
import Firebase from 'firebase'

export default {
  name: 'app',
   data: () => ({
      drawer: null,
      searchText: '',
      isLogin: Firebase.auth().currentUser
    }),
    props: {
      source: String
    },
    mounted() {
      var that = this;
      Firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          that.isLogin = true;
        } else {
           that.isLogin = false;
          
        }
      });
    }, 
    methods: {
      ...mapActions({
         'changeText' : 'changeSearchText'               
      }),
      searchClick: function() {
        this.changeText(this.searchText)  
        this.$router.push({ name: 'SearchList'})     
       
      },
      logout: function(){
        this.drawer = !this.drawer;
        Firebase.auth().signOut();
        this.$router.push({ name: 'SearchList'}) 
      }
    }
}
</script>

<style scoped>
  .navigation-drawer a {
    text-decoration: none !important;
  }
</style>

