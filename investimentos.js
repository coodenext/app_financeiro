import { auth, db } from './firebase-init.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Verifica se o usuário está autenticado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  } else {
    carregarInvestimentos();
  }
});

// Voltar para a página principal
document.getElementById("btnVoltar").addEventListener("click", () => {
  window.location.href = "plataforma.html";
});

// Carregar investimentos
async function carregarInvestimentos() {
  const lista = document.getElementById("listaInvestimentos");
  if (lista) lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "investimentos"));

  if (lista && querySnapshot.empty) {
    lista.innerHTML = "<p>Nenhum investimento cadastrado ainda.</p>";
    return;
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("div");
    item.classList.add("item-investimento");
    item.innerHTML = `
      <strong>${data.nome}</strong><br>
      Valor: R$ ${data.valor.toFixed(2)}<br>
      Mês: ${data.mes}
    `;
    if (lista) lista.appendChild(item);
  });
}