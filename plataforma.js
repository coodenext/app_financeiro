// Importa os módulos necessários
import { auth, db } from './firebase-init.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Verifica autenticação
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  }
});

// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM totalmente carregado!");

  // Botão de logout
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      signOut(auth)
        .then(() => window.location.href = 'login.html')
        .catch((error) => alert("Erro ao sair: " + error.message));
    });
  }

  // Botão de exportar PDF
  const btnExportar = document.getElementById("exportarPdf");
  if (btnExportar) {
    btnExportar.addEventListener("click", gerarRelatorioPDF);
  }

  // Botão para adicionar investimento
  const formInvestimento = document.getElementById("formInvestimento");
  if (formInvestimento) {
    formInvestimento.addEventListener("submit", adicionarInvestimento);
  }  

  carregarGastos();
  carregarInvestimentos();
  carregarHistoricoMensal();
});

// Função: Adicionar investimento
async function adicionarInvestimento(e) {
  e.preventDefault(); // impede o envio padrão do formulário

  const nome = document.getElementById("nomeInvestimento").value;
  const valor = parseFloat(document.getElementById("valorInvestimento").value);
  const mes = document.getElementById("mesInvestimento").value;

  if (!nome || isNaN(valor) || !mes) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  try {
    await addDoc(collection(db, "investimentos"), {
      nome,
      valor,
      mes,
      criadoEm: Timestamp.now()
    });

    alert("Investimento adicionado com sucesso!");
    document.getElementById("formInvestimento").reset(); // limpa o form
    carregarInvestimentos(); // Atualiza a lista
  } catch (error) {
    alert("Erro ao adicionar investimento: " + error.message);
  }
}

// Função: Carregar gastos
async function carregarGastos() {
  const querySnapshot = await getDocs(collection(db, "gastos"));
  querySnapshot.forEach((doc) => {
    console.log(`Gasto ${doc.id} =>`, doc.data());
  });
}

// Função: Carregar investimentos
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

// Função: Carregar histórico mensal
async function carregarHistoricoMensal() {
  const querySnapshot = await getDocs(collection(db, "historicoMensal"));
  querySnapshot.forEach((doc) => {
    console.log(`Histórico ${doc.id} =>`, doc.data());
  });
}

// Função: Gerar gráfico de resumo mensal (placeholder)
function gerarGraficoResumo() {
  console.log("Gráfico de resumo mensal gerado");
}

// Função: Previsão de aposentadoria
async function calcularPrevisaoAposentadoria() {
  const investimentos = await getDocs(collection(db, "investimentos"));
  let totalInvestido = 0;

  investimentos.forEach((doc) => {
    const data = doc.data();
    totalInvestido += data.valor || 0;
  });

  const rendimentoMensal = totalInvestido * 0.01; // Exemplo: 1% ao mês
  const metaAposentadoria = 3000; // Meta de renda passiva
  const meses = Math.ceil(metaAposentadoria / rendimentoMensal);

  console.log(`Você poderá se aposentar em aproximadamente ${meses} meses.`);
}

// Função: Gerar relatório em PDF
function gerarRelatorioPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Relatório Completo da Plataforma Financeira", 10, 10);
  doc.text("- Gastos\n- Investimentos\n- Feira do Mês\n- Comparativo Mensal\n- Previsão de Aposentadoria", 10, 20);

  doc.save("relatorio_completo.pdf");
}

// Sugestões futuras:
// - Gráficos com Chart.js
// - Filtros por mês/data
// - Dashboard de resumo
// - Alertas para metas financeiras