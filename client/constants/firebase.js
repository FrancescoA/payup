import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "payupd-4ffe3.firebaseapp.com",
    databaseURL: "https://payupd-4ffe3.firebaseio.com",
    storageBucket: "",
  })

export default firebaseApp

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()