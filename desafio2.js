let tempoAtual = 0;
let tempoFechado = 0;
let sinalVerde = true;
let aguardandoFechar = false;
let pedestresPoderiamPedir = true;

const verde = document.getElementById('verde');
const amarelo = document.getElementById('amarelo');
const vermelho = document.getElementById('vermelho');
const tempoDisplay = document.getElementById('tempo');
const botaoFechar = document.getElementById('fechar-sinal');

function iniciarSemaforo() {
    verde.style.backgroundColor = 'green';
    amarelo.style.backgroundColor = '#444';
    vermelho.style.backgroundColor = '#444';
    sinalVerde = true;
    tempoAtual = 0;

    setTimeout(() => {
        verde.style.backgroundColor = '#444';
        amarelo.style.backgroundColor = 'yellow';
        sinalVerde = false;
        setTimeout(() => {
            amarelo.style.backgroundColor = '#444';
            vermelho.style.backgroundColor = 'red';
            tempoFechado = 0;
            setTimeout(iniciarSemaforo, 15000);
        }, 3000);
    }, 10000);
}
function fecharSinal() {
    if (sinalVerde) {
        aguardandoFechar = true;
        setTimeout(() => {
            if (aguardandoFechar) {
                verde.style.backgroundColor = '#444';
                amarelo.style.backgroundColor = 'yellow';
                sinalVerde = false;
                setTimeout(() => {
                    amarelo.style.backgroundColor = '#444';
                    vermelho.style.backgroundColor = 'red';
                    tempoFechado = 0;
                    setTimeout(iniciarSemaforo, 15000);
                }, 3000)
            }
            aguardandoFechar = false;
        }, 3000)
    } else {
        amarelo.style.backgroundColor = '#444';
        vermelho.style.backgroundColor = 'red';
        tempoFechado = 0;
        setTimeout(iniciarSemaforo, 15000);
    }
}
function checarTempo() {
    if (pedestresPoderiamPedir) {
        botaoFechar.addEventListener('click', () => {
            if(tempoAtual >= 60) {
                fecharSinal();
                pedestresPoderiamPedir = false;
                setTimeout(() => pedestresPoderiamPedir = true, 60000);
            } else {
                alert('Aguarde 60 segundos para solicitar novamente.');
            }
        });
    }
}
function atualizarTempo() {
    tempoAtual++;
    tempoDisplay.textContent = `Tempo atual: ${tempoAtual} segundos`;
}

setInterval(() => {
    atualizarTempo();
    checarTempo();
}, 1000);
window.onload = iniciarSemaforo;