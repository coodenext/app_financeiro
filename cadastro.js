// Importa os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVPqguUyZrVXpma3JW6WD_AgAInTknHeQ",
  authDomain: "plataforma-financeira-2d541.firebaseapp.com",
  projectId: "plataforma-financeira-2d541",
  storageBucket: "plataforma-financeira-2d541.appspot.com",
  messagingSenderId: "322627837971",
  appId: "1:322627837971:web:615f3caba0d93aa0911fe6"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Evento de cadastro
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const confirmarSenha = document.getElementById("confirmar-senha").value;
      const erroSenha = document.getElementById("erro-senha");

      // Validação das senhas
      if (senha !== confirmarSenha) {
        erroSenha.textContent = "As senhas não coincidem.";
        erroSenha.style.display = "block";
        return;
      } else {
        erroSenha.style.display = "none";
      }

      try {
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "login.html";
      } catch (error) {
        alert("Erro ao cadastrar: " + error.message);
      }
    });
  }
});