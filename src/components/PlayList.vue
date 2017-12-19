<template>      
     <v-layout row>            
     <v-flex>
      <v-btn  color="error" v-on:click="playAll">PLAY LIST
      <v-icon>audiotrack</v-icon>
      </v-btn>   
     <v-btn flat color="orange" v-on:click="goBack">BACK</v-btn>  

     <v-list>
          <v-list-tile v-for="video in videos" avatar :class="'is_play_'+video.isPlay"> 
            <v-list-tile-action v-if="!video.isPlay">
              <v-icon v-on:click="play(video)">play_circle_filled</v-icon>           
            </v-list-tile-action>    
            <v-list-tile-action v-if="video.isPlay">             
              <v-icon v-on:click="stop(video)">pause_circle_filled</v-icon>
            </v-list-tile-action>                   
            <v-list-tile-content v-on:click="play(video)">
              <v-list-tile-sub-title v-html="video.snippet.title"></v-list-tile-sub-title>
            </v-list-tile-content>
             <v-list-tile-action>
              <v-icon v-on:click="openInNew(video.id)">open_in_browser</v-icon>
            </v-list-tile-action>
             <v-list-tile-action>
              <v-icon v-on:click="dialogRemove = true">delete_forever</v-icon>
            </v-list-tile-action>
            <v-dialog v-model="dialogRemove" max-width="290">
              <v-card>
                <v-card-title class="headline">Answer</v-card-title>
                <v-card-text>Do you remove this position from playlist ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" v-on:click="remove(video['.key'])" @click.native="dialog = false">Yes</v-btn>
                  <v-btn color="green darken-1" flat="flat" v-on:click="dialogRemove = false">No</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-list-tile>          
        </v-list>           
      </v-flex>
      <div :id="currentVideo.id"></div>
      <div id="video" ref="video"></div>
    </v-layout>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'PlayList',
  data () {
    return {  
       playlists : [],
       videos: [],
       dialogRemove: false,
       currentVideo: "", 
       player: {} 
    }
  },
  props: ["playlistId"], 
  mounted(){         
    var ref = firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/playlists/'+this.playlistId+'/videos');
    this.$bindAsArray('videos', ref) 

    console.log(this.videos)
    this.player =  this.onYouTubeIframeAPIReady();
   
    
  },

  methods: {   
    onYouTubeIframeAPIReady: function(){
      var that = this;    
        var player, playing = false;
        player = new YT.Player('video', {
            height: '0',
            width: '0',            
            events: {
                'onStateChange': onPlayerStateChange
            }
        });

        function onPlayerStateChange(event) {
          if(event.data == 0){                  
            that.play(that.findNextVideoId(that.currentVideo ));
          }          
        }

        return player;

    },
    goBack: function(playlistKey){
      this.$router.go(-1);
    },
    openInNew: function(videoId){
      this.$router.push({ name: 'Player', params: { videoId: videoId }})
    },
    play: function(video){
      if(Object.keys(this.currentVideo).length !== 0) {
        this.videos[this.videos.indexOf(this.currentVideo)].isPlay = false;
      }
              
      this.player.loadVideoById(video.id)    
      this.currentVideo = video;
      video.isPlay = true;           
      
    },
    remove: function(key){      
      firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/playlists/'+this.playlistId+'/videos/'+key).remove();
    },
    playAll: function(){     
       if(Object.keys(this.currentVideo).length !== 0) {
        this.videos[this.videos.indexOf(this.currentVideo)].isPlay = false;
       }
       this.videos[0].isPlay = true;
       this.player.loadVideoById(this.videos[0].id)
       this.currentVideo = this.videos[0];      
    },
    stop: function(video){
      this.currentVideo= {}; 
      this.player.stopVideo();     
      video.isPlay = false;
    },
    findNextVideoId: function(video){      
        video.isPlay = false;        
        if(this.videos.indexOf(video) == this.videos.length-1){
          return this.videos[0];
        }

        return this.videos[this.videos.indexOf(video)+1];
    }
  }

 
}
</script>

<style scoped>
  .is_play_true {
    background-color: #d15151;    
  }
  .list__tile__sub-title {
    width: auto;
    white-space: normal;

  }
</style>



