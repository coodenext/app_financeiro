// login.js
import { auth } from './firebase-init.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const loginForm = document.getElementById('loginForm'); // com "F" maiúsculo

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Redireciona para dashboard
      window.location.href = "/app_financeiro/dashboard/index.html";
    })
    .catch((error) => {
      alert("Erro ao fazer login: " + error.message);
    });
});