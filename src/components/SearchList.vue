<template>
  <div class="hello">
       <v-container grid-list-md text-xs-center>
     <v-layout row wrap>     
      <v-flex xs6 v-for="video in videos">
        <v-card >
          <v-card-media v-bind:src="video.snippet.thumbnails.high.url" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{video.snippet.title}}</h3>
             <!--  <div>{{video.snippet.description}}</div> -->
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" v-on:click="showVideo(video.id.videoId)">SHOW</v-btn>            
          </v-card-actions>
        </v-card>
      </v-flex>
      <div>
         <v-btn v-if="prevPageToken !== ''" v-on:click="getNextPage(prevPageToken)" color="error">< PREVIOUS</v-btn>
         <v-btn v-on:click="getNextPage(nextPageToken)" color="error">NEXT ></v-btn>
        
      </div>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex'

export default {
  name: 'SearchList',
  data () {
    return {          
      videos: [],
      nextPageToken: '',
      prevPageToken: ''
    }
  }, 
  computed: {
      ...mapGetters({
        'searchText': 'getSearchText' 
      })      
  }, 
  methods: {
    ...mapActions({
         'changeText' : 'changeSearchText'               
    }),
    getVideos: function(){  
      var result = this.$getYoutubeData('search', {
          maxResults: '10',
          part: 'snippet',
          chart: 'mostPopular',
          q: this.searchText
      });  

      this.videos = result.items;
      this.nextPageToken = result.nextPageToken;
    },
    getNextPage: function(token){
      var result = this.$getYoutubeData('search', {
          maxResults: '10',
          part: 'snippet',
          chart: 'mostPopular',
          q: this.searchText,
          pageToken: token
      });  
      this.videos = result.items;      
      this.nextPageToken = result.nextPageToken;
      if(result.prevPageToken){
        this.prevPageToken = result.prevPageToken;
      }else{
        this.prevPageToken = '';
      }

      window.scrollTo(0,0);
    },
    showVideo: function(videoId){
       this.$router.push({ name: 'Player', params: { videoId: videoId }})
    }
  },
  watch: {
    searchText: function (val) {     
      this.getVideos(val)
    
    }
  },  
  mounted(){
      //this.changeText('dogs');         
      this.getVideos();
      
    }
}
</script>


