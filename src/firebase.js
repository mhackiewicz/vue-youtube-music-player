import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyD5QCt8cT8D6G4i3Ox4FCEr5wl_sCZ3tq8",
    authDomain: "music-player-189109.firebaseapp.com",
    databaseURL: "https://music-player-189109.firebaseio.com",
    projectId: "youtube-music-player-189109",
    storageBucket: "youtube-music-player-189109.appspot.com",
    messagingSenderId: "991646394634"
});


export const db = firebaseApp.database();