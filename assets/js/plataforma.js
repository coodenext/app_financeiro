// dashboard.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import jsPDF from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVPqguUyZrVXpma3JW6WD_AgAInTknHeQ",
  authDomain: "plataforma-financeira-2d541.firebaseapp.com",
  projectId: "plataforma-financeira-2d541",
  storageBucket: "plataforma-financeira-2d541.appspot.com",
  messagingSenderId: "322627837971",
  appId: "1:322627837971:web:615f3caba0d93aa0911fe6"
};

// Inicialização Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exemplo: buscar dados da coleção "gastos"
async function carregarGastos() {
  const querySnapshot = await getDocs(collection(db, "gastos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
}

// Simples geração de PDF
document.getElementById("exportarPdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Relatório Financeiro", 10, 10);
  doc.save("relatorio.pdf");
});

// Chamada inicial de carregamento
carregarGastos();