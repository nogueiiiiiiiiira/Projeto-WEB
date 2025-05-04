
window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("game_canvas");
    ctx = canvas.getContext("2d");

    let imagem_fundo = new Image(); // cria uma nova imagem
    imagem_fundo.src = "/data/imagens/fundo.png"; // define a fonte da imagem de fundo

    const num_lixos = 5; // número de tipos de lixo
    const colors = ["#0000FF", "#00FF00", "#FFFF00", "#FF0000", "#A52A2A"]; // cores para os tipos de lixo
    let lixos = []; // array para armazenar as bolas de lixo
    let jogo_completo = false; // variável para verificar se o jogo foi completado

    const imagens_lixo = [ // imagens para os tipos de lixo
        [new Image(), new Image()], // papel
        [new Image(), new Image()], // vidro
        [new Image(), new Image()], // plástico
        [new Image(), new Image()], // metal
        [new Image(), new Image()]  // orgânico
    ];

    imagens_lixo[0][0].src = "/data/imagens/papel1.png";
    imagens_lixo[0][1].src = "/data/imagens/papel2.png"; 
    imagens_lixo[1][0].src = "/data/imagens/vidro1.png";
    imagens_lixo[1][1].src = "/data/imagens/vidro2.png";
    imagens_lixo[2][0].src = "/data/imagens/plas1.png";
    imagens_lixo[2][1].src = "/data/imagens/plas2.png";
    imagens_lixo[3][0].src = "/data/imagens/lata1.png";
    imagens_lixo[3][1].src = "/data/imagens/lata2.png";
    imagens_lixo[4][0].src = "/data/imagens/org1.png";
    imagens_lixo[4][1].src = "/data/imagens/org2.png";

    function iniciar_jogo() {
        jogo_completo = false; // inicia o jogo como incompleto
        const aleatorio_lixos = Math.floor(Math.random() * 20) + 1; // gera um número aleatório de lixos entre 1 e 20
        lixos = Array.from({ length: aleatorio_lixos }, (_, i) => ({ // cria um array de lixos
            x: Math.random() * 500 + 50, // posição x aleatória
            y: Math.random() * 300 + 250, // posição y aleatória
            radius: 25, // raio da bola
            type: i % num_lixos, // tipo de lixo (0 a 4)
            variation: Math.floor(Math.random() * 2), // variação aleatória (0 ou 1)
            dragging: false, // flag para verificar se o usuário está arrastando a bola
            sorted: false // flag para verificar se a bola foi classificada
        }));

        imagem_fundo.onload = () => { // quando a imagem de fundo carregar
            desenhar_jogo(); // desenha o jogo
        };
    }

    function desenha_cena() { // desenha a cena
        for (let i = 0; i < num_lixos; i++) { // para cada tipo de lixo
            ctx.fillStyle = colors[i]; // define a cor
            ctx.fillRect(i * (canvas.width / num_lixos), 25, canvas.width / num_lixos, 155); // desenha o retângulo
        }
    }

    function desenha_lixos() { // desenha os lixos
        lixos.forEach(lixo => { // para cada bola de lixo
            if (!lixo.sorted) { // se não estiver classificada
                const img = imagens_lixo[lixo.type][lixo.variation]; // pega a imagem correspondente
                ctx.drawImage(img, lixo.x - lixo.radius, lixo.y - lixo.radius, lixo.radius * 2, lixo.radius * 2); // desenha a imagem
            }
        });
    }

    function lixo_correto(lixo) { // verifica se o lixo está na caixa correta
        const boxWidth = canvas.width / num_lixos; // largura da caixa
        const correctXStart = lixo.type * boxWidth; // posição inicial da caixa correta
        const correctXEnd = correctXStart + boxWidth; // posição final da caixa correta

        if (lixo.y > 25 && lixo.y < 180 && lixo.x > correctXStart && lixo.x < correctXEnd) { // se o lixo estiver na caixa correta
            lixo.sorted = true; // marca como classificado
        }
    }

    function desenhar_jogo() { // desenha o jogo
        ctx.clearRect(0, 0, canvas.width, canvas.height); // limpa o canvas
        desenha_cena(); // desenha a cena

        const radius = 25; // raio da bola
        ctx.beginPath(); // inicia o caminho para desenhar
        ctx.moveTo(radius, 0); // move o ponteiro para a posição inicial
        ctx.lineTo(canvas.width - radius, 0); // desenha uma linha até a posição final
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius); // desenha uma curva
        ctx.lineTo(canvas.width, canvas.height - radius); // desenha uma linha
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height); // desenha uma curva
        ctx.lineTo(radius, canvas.height); // desenha uma linha
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius); // desenha uma curva
        ctx.lineTo(0, radius); // desenha uma linha
        ctx.quadraticCurveTo(0, 0, radius, 0); // desenha uma curva
        ctx.closePath(); // fecha o caminho
        ctx.clip(); // aplica o recorte

        if (imagem_fundo) { // se a imagem de fundo estiver carregada

            const x = (canvas.width - canvas.width) / 2; // posição x
            const y = (canvas.height - canvas.height) / 2; // posição y
            ctx.drawImage(imagem_fundo, x, y, canvas.width, canvas.height); // desenha a imagem de fundo
        }

        desenha_lixos(); // desenha os lixos
        verificar_completo(); // verifica se o jogo está completo
    }

    function verificar_completo() { 
        if (lixos.every(lixo => lixo.sorted)) { // se todos os lixos estiverem classificados
            jogo_completo = true; // marca o jogo como completo
            mensagem_conclusao(); // exibe a mensagem de conclusão
        }
    }

    function mensagem_conclusao() {
        ctx.fillStyle = "black"; // define a cor do texto
        ctx.font = "bold 24px Comic Sans MS"; // define a fonte do texto
        ctx.textAlign = "center"; // alinha o texto ao centro
        alert("Parabéns! Você separou o lixo corretamente!"); // exibe a mensagem de conclusão
    }

    canvas.addEventListener("mousedown", (e) => { // adiciona um evento de clique no canvas
        const { offsetX, offsetY } = e; // obtém a posição do clique
        if (jogo_completo) return; // se o jogo estiver completo, não faz nada

        lixos.forEach((lixo) => { // para cada bola de lixo
            if (!lixo.sorted && Math.hypot(lixo.x - offsetX, lixo.y - offsetY) < lixo.radius) { // se a bola não estiver classificada e o clique estiver dentro do raio da bola
                lixo.dragging = true; // marca como arrastando
            }
        });
    });

    canvas.addEventListener("mousemove", (e) => { // adiciona um evento de movimento do mouse no canvas
        const { offsetX, offsetY } = e; // obtém a posição do mouse
        if (jogo_completo) return; // se o jogo estiver completo, não faz nada

        lixos.forEach((lixo) => { // para cada bola de lixo
            if (lixo.dragging) { // se estiver arrastando
                lixo.x = offsetX; // atualiza a posição x
                lixo.y = offsetY; // atualiza a posição y
                desenhar_jogo(); // desenha o jogo
            }
        });
    });

    canvas.addEventListener("mouseup", () => { // adiciona um evento de soltar o botão do mouse no canvas
        lixos.forEach((lixo) => { // para cada bola de lixo
            if (lixo.dragging) { // se estiver arrastando
                lixo_correto(lixo); // verifica se o lixo está na caixa correta
                lixo.dragging = false; // marca como não arrastando
            }
        });
        desenhar_jogo(); // desenha o jogo
    });

    // inicia o jogo
    iniciar_jogo();
});

function tocar_botao(event, redirectUrl) {
    event.preventDefault(); // previne o comportamento padrão do botão
    var audio = document.getElementById("som_botao"); // obtém o elemento de áudio
    audio.currentTime = 0; // reinicia o áudio para o início
    audio.play().then(() => { // toca o áudio
        audio.onended = function () { // quando o áudio terminar
            window.location.href = redirectUrl; // redireciona para a URL especificada
        }; 
    }).catch(error => { // captura erros na reprodução do áudio
        console.error("Erro ao reproduzir o som:", error);
    });
}

