// assets/js/login.js

import { auth } from "./firebase-init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        await signInWithEmailAndPassword(auth, email, senha);
        alert("Login realizado com sucesso!");
        window.location.href = "../plataforma/index.html"; // Redireciona para a plataforma
      } catch (error) {
        alert("Erro ao fazer login: " + error.message);
      }
    });
  }
});