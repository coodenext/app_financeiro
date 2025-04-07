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

// Garante que o DOM está carregado antes de adicionar o listener
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "login.html";
      } catch (error) {
        alert("Erro ao cadastrar: " + error.message);
      }
    });
  } else {
    alert("Formulário não encontrado no DOM.");
  }

  catch (error) {
    console.error("Erro completo:", error); // <-- Adiciona isso
    alert("Erro ao cadastrar: " + error.message);
  }
});