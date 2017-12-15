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
              <h3 class="headline mb-0">{{video.snippet.titile}}</h3>
              <div>{{video.snippet.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      videos: []
    }
  },
  mounted(){     
      this.videos = this.$getYoutubeData('search', {
          maxResult: '25',
          part: 'snippet',
          q: 'surfing',
      }).items;
    }
}
</script>


