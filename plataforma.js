import { auth, db } from './firebase-init.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM totalmente carregado!");

  // Verifica se o usuário está autenticado
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.warn("Usuário não autenticado. Redirecionando...");
      window.location.href = 'login.html';
      return; // Interrompe a execução do restante
    }

    console.log("Usuário autenticado:", user.email);

    // A partir daqui o usuário está logado e o restante pode ser carregado

    const btnLogout = document.getElementById("btnLogout");

    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        console.log("Clique no botão de logout detectado!");
        signOut(auth)
          .then(() => {
            console.log("Usuário deslogado com sucesso");
            window.location.href = 'login.html';
          })
          .catch((error) => {
            console.error("Erro ao sair:", error);
            alert("Erro ao sair: " + error.message);
          });
      });
    }

    // Botão Exportar PDF
    const btnExportar = document.getElementById("exportarPdf");
    if (btnExportar) {
      btnExportar.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Relatório Financeiro", 10, 10);
        doc.save("relatorio.pdf");
      });
    }

    // Carrega dados
    carregarGastos();
  });
});

// Exemplo: buscar dados da coleção "gastos"
async function carregarGastos() {
  const querySnapshot = await getDocs(collection(db, "gastos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
}
