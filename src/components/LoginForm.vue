<template>
  <div class="login">
  	<h3 class="title">Login</h3> 
     <v-container grid-list-md text-xs-center>     
     <v-layout row wrap>
            
       <v-form ref="form" lazy-validation>
		    <v-text-field
		      label="Email"
		      v-model="email"		     		      
		      required
		    ></v-text-field>
		    <v-text-field
		      label="Password"
		      v-model="password"	
		      type="password"	     
		      required
		    ></v-text-field>
		   
		    <v-btn
		      @click="submit"		      
		    >
		      submit
		    </v-btn>    
		    <v-btn flat color="orange" v-on:click="goBack">BACK</v-btn>  
		    <br/>
		    <br/>
		    <div>If you not have account yet, you must <router-link :to="{name: 'RegisterForm'}">register</router-link></div> 		
  		</v-form>

    </v-layout>
    </v-container>     
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'LoginForm',  
  data () {
    return {          
      	email: '',
		password: ''
    }
  },
  methods: {
  	submit: function(){
		firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
			(user) => {						
				this.$router.push({name: 'PlayLists'});								
			},
			(err) => {
				alert('Oops. '+err.message)				
			}
		)
  	},
  	goBack: function(){
  		this.$router.go(-1);
  	}
  }
  
}
</script>

<style scoped>
	h3.title {
		font-size: 20px;
	}
</style>


