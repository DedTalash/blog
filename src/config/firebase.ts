import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDlicUhhLBsKotRYSQ2rsaJ9NnX83RkD0o",
	authDomain: "myproject-33aee.firebaseapp.com",
	databaseURL: "https://myproject-33aee.firebaseio.com",
	projectId: "myproject-33aee",
	storageBucket: "myproject-33aee.appspot.com",
	messagingSenderId: "60608872832",
	appId: "1:60608872832:web:f5ef0949560edadf840165"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();