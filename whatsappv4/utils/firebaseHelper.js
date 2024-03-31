// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBSY7wyXzJjRBGFCugN8m2_c2fdlBRwuHY",
    authDomain: "whatsapp-332d0.firebaseapp.com",
    databaseURL: "https://whatsapp-332d0-default-rtdb.firebaseio.com",
    projectId: "whatsapp-332d0",
    storageBucket: "whatsapp-332d0.appspot.com",
    messagingSenderId: "763202081175",
    appId: "1:763202081175:web:6eb5354394740e486134d2",
    measurementId: "G-D4NQYT3G4T",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
