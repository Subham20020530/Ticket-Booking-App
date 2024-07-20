import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBCxd0XtfOnPFWQzCRkLU4VhfkvYi_rHcs",
  authDomain: "ticket-booking-app-fcf78.firebaseapp.com",
  projectId: "ticket-booking-app-fcf78",
  storageBucket: "ticket-booking-app-fcf78.appspot.com",
  messagingSenderId: "645574029981",
  appId: "1:645574029981:web:93356ae0bb6d7702045a74",
  measurementId: "G-6XZGZKMFV8",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

