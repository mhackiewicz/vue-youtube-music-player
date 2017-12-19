<template>
  <div class="hello">
  	<v-btn flat color="orange" v-on:click="goBack">BACK</v-btn>        
     <v-container grid-list-md text-xs-center>
     
     <v-layout row wrap>
     <h3>{{video.snippet.title}}</h3>        
     <iframe id="player" type="text/html" width="640" height="360" :src="'http://www.youtube.com/embed/'+videoId+'?autoplay=1'" frameborder="0"></iframe>
     <!-- <p>{{video.snippet.description}}</p> -->     
     <v-menu offset-y>
      <v-btn color="error" slot="activator">+ ADD TO PLAYLIST</v-btn>
      <v-list>
        <v-list-tile v-for="item in playlists" :key="item.title" @click="">
          <v-list-tile-title v-on:click="addToPlaylist(item['.key'],item)">{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-layout>
    </v-container>
  </div>
</template>

<script>

import {db} from '@/firebase'
import firebase from 'firebase'

export default {
  name: 'Player',  
  data () {
    return {          
      video: {},
      playlists: [],     
    }
  },
  props: ["videoId"],
  beforeMount() {  	
  	this.video = this.$getYoutubeData('videos', {
        id: this.videoId,
        part: 'snippet'        
    }).items[0];  

   
	
 }, 
 mounted() {
 	var ref = firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/playlists');
    this.$bindAsArray('playlists', ref)  

 	var iFrame = document.getElementById( 'player' );
    window.addEventListener('resize', function(e) {		
		resizeIFrameToFitContent( iFrame );
	});

	resizeIFrameToFitContent(iFrame)

	function resizeIFrameToFitContent( iFrame ) {		
    	iFrame.width  = window.innerWidth-80;
    	iFrame.height  = window.innerHeight-200;    	
	}
 },  
 methods: {
  	goBack: function(){
  		this.$router.go(-1);
  	},
  	addToPlaylist: function(playlistKey, playlist){  		
  	    db.ref('users/'+firebase.auth().currentUser.uid+'/playlists/'+playlistKey+'/videos').push(this.video);  	    		
  	}
  }
 
}
</script>


