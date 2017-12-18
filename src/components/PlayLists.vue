<template>  
     <v-layout row>        
     <v-flex>
     <v-list>
          <v-list-tile v-for="playlist in playlists" avatar @click="">                    
            <v-list-tile-content v-on:click="goToList(playlist['.key'])">
              <v-list-tile-title>{{playlist.title}}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>          
        </v-list>
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        class="button-add"
        color="error"
        @click.native.stop="dialog = true"
      >
       <v-icon>add</v-icon>
      </v-btn>      
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Add new playlist</v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Name"
              v-model="name"                               
            ></v-text-field>           
                        
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" v-on:click="addNewPlayList" @click.native="dialog = false">Add</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
       
      </v-flex>
    </v-layout>
</template>

<script>

import {db} from '@/firebase'


export default {
  name: 'PlayLists',
  data () {
    return {  
       playlists : [],
       dialog: false,
       name:""      
    }
  },
  mounted(){  
  },
  firebase: {
    playlists: db.ref('playlists')    
  },
  methods: {
    addNewPlayList: function(){
      var playlist= {
         title: this.name
      }
      this.$firebaseRefs.playlists.push(playlist, function(error){           
          if(error){
            alert("error");
          }
      });
    },
    goToList: function(playlistKey){
      //this.$router
    }
  }

 
}
</script>

<style scoped>
  .button-add{
    margin-bottom: 80px;
  }
</style>


