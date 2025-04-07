// assets/js/plataforma.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function salvarHistorico() {
  const user = auth.currentUser;
  if (!user) return alert("Faça login primeiro");
  const uid = user.uid;
  const mes = document.getElementById("mesReferencia").value;
  const cartao = parseFloat(document.getElementById("gastoCartao").value) || 0;
  const feira = parseFloat(document.getElementById("gastoFeira").value) || 0;
  const investimentos = parseFloat(document.getElementById("investimentos").value) || 0;
  const total = cartao + feira + investimentos;

  await addDoc(collection(db, "historico"), { uid, mes, cartao, feira, investimentos, total });
  alert("Dados salvos com sucesso!");
}

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Relatório Financeiro", 10, 10);
  doc.save("relatorio.pdf");
}
