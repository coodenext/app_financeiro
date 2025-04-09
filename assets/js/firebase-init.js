import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVPqguUyZrVXpma3JW6WD_AgAInTknHeQ",
  authDomain: "plataforma-financeira-2d541.firebaseapp.com",
  projectId: "plataforma-financeira-2d541",
  storageBucket: "plataforma-financeira-2d541.appspot.com",
  messagingSenderId: "322627837971",
  appId: "1:322627837971:web:615f3caba0d93aa0911fe6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };