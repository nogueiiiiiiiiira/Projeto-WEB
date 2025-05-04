function tocar_botao(event, redirectUrl) { 
    event.preventDefault(); // previne o comportamento padrão do botão
    var audio = document.getElementById("som_botao"); // obtém o elemento de áudio
    audio.currentTime = 0; // reinicia o áudio
    audio.play().then(() => { // toca o áudio
        audio.onended = function () { // quando o áudio terminar
            window.location.href = redirectUrl; // redireciona para a página desejada
        }; 
    }).catch(error => { // captura erros na reprodução do áudio
        console.error("Erro ao reproduzir o som:", error);
    });
}