const celulas = document.querySelectorAll(".celula");

let vezDoX = true;

const combinacoesVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontais
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Verticais
  [0, 4, 8],
  [2, 4, 6], // Diagonais
];

function verificarVitoria(jogadorAtual) {
  // .some verifica se PELO MENOS UMA combinação é verdadeira
  return combinacoesVitoria.some((combinacao) => {
    // .every verifica se TODAS as posições daquela combinação têm o mesmo jogador
    return combinacao.every((index) => {
      return celulas[index].textContent === jogadorAtual;
    });
  });
}

function verificarEmpate() {
  // Se todas as células estiverem preenchidas e ninguém venceu
  return [...celulas].every((celula) => {
    return celula.textContent === "X" || celula.textContent === "O";
  });
}

function tratarClique(evento) {
  const jogadorAtual = vezDoX ? "X" : "O";
  evento.target.textContent = jogadorAtual;

  if (verificarVitoria(jogadorAtual)) {
    // 1. Trava o tabuleiro IMEDIATAMENTE
    document.getElementById("tabuleiro-jogo").style.pointerEvents = "none";

    // 2. Espera 100 milissegundos para mostrar o alerta
    setTimeout(() => {
      alert("Parabéns! O jogador " + jogadorAtual + " venceu!");
    }, 100);
  } else if (verificarEmpate()) {
    setTimeout(() => {
      alert("Deu Velha! Empate.");
    }, 100);
  } else {
    vezDoX = !vezDoX;
  }
}

function iniciarJogo() {
  // ESTA LINHA REATIVA OS CLIQUES:
  document.getElementById("tabuleiro-jogo").style.pointerEvents = "auto";

  vezDoX = true;
  celulas.forEach((celula) => {
    celula.textContent = "";
    celula.removeEventListener("click", tratarClique);
    celula.addEventListener("click", tratarClique, { once: true });
  });
  celulas.forEach((celula) => {
    celula.textContent = "";
  });
}

document
  .getElementById("botaoReiniciar")
  .addEventListener("click", iniciarJogo);

iniciarJogo();
