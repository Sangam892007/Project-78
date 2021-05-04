import firebase from 'firebase'
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCSSXoreyEri3qt9-osZzqNRmg_RQ3MKaE",
    authDomain: "barter-system-project-70413.firebaseapp.com",
    projectId: "barter-system-project-70413",
    storageBucket: "barter-system-project-70413.appspot.com",
    messagingSenderId: "87266376965",
    appId: "1:87266376965:web:831ff484af7412de3d0b6c"
  };

if (!firebase.apps.length)
firebase.initializeApp(firebaseConfig)
export default firebase.firestore()