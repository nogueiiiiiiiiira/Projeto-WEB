function tocar_botao(event, redirectUrl) { 
    event.preventDefault(); // previne o comportamento padrão do botão
    var audio = document.getElementById("som_botao"); // obtém o elemento de áudio
    audio.currentTime = 0; // reinicia o áudio para o início
    audio.play().then(() => { // toca o áudio
        audio.onended = function () { // quando o áudio terminar
            window.location.href = redirectUrl; // redireciona para a URL
        };
    }).catch(error => { // captura erros na reprodução do áudio
        console.error("Erro ao reproduzir o som:", error);
    });
}

window.onload = function () { // função executada quando a página é carregada
    musica_fundo(); // inicializa a música de fundo

    const guardar_animacao_ativa = localStorage.getItem('animacao_ativa'); // obtém o valor armazenado de animações
    if (guardar_animacao_ativa !== null) { // se o valor for diferente de null
        animacao_ativa = guardar_animacao_ativa === 'true'; // converte o valor para booleano
    }

    const images = document.querySelectorAll('.image-left, .image-right'); // seleciona todos os elementos com classe image-left e image-right
    images.forEach(image => { // para cada imagem
        image.style.animationPlayState = animacao_ativa ? 'running' : 'paused'; // define o estado da animação
    });
};