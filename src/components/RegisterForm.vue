<template>
  <div class="register">
  	<h3 class="title">Register</h3> 
     <v-container grid-list-md text-xs-center>     
     <v-layout row wrap>
            
       <v-form v-model="valid" ref="form" lazy-validation>
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
		    <div>If you have account, you can <router-link :to="{name: 'LoginForm'}">login</router-link></div> 		
  			</v-form>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '@/firebase'

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
		firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
			(user) => {									
				db.ref('users').child(user.uid).set({
					userId: user.uid, 
					email: user.email
				});			
							
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


