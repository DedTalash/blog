import firebase from "firebase";
import 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyC2_njUyrAwAauPZ8yAzG09zaM6tnKIJkQ",
	authDomain: "blog-7ceac.firebaseapp.com",
	databaseURL: "https://blog-7ceac.firebaseio.com",
	projectId: "blog-7ceac",
	storageBucket: "blog-7ceac.appspot.com",
	messagingSenderId: "203761292532",
	appId: "1:203761292532:web:fa4671f185ea289db83aa1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export {db,firebase}

// Project Console: https://console.firebase.google.com/project/blog-7ceac/overview
//     Hosting URL: https://blog-7ceac.web.app