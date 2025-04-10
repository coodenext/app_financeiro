// assets/js/login.js

import { auth } from "./firebase-init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Escutando o envio do formulário
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    // Tenta fazer login com email e senha
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log("Login bem-sucedido:", user);

    // Redireciona para o painel principal
    window.location.href = "/app_financeiro/dashboard/plataforma.html";
  } catch (error) {
    console.error("Erro no login:", error.code, error.message);
    alert("Email ou senha incorretos. Tente novamente.");
  }
});