function tocar_som_botao() {
    var audio = document.getElementById("som_botao"); // pegar o elemento de áudio
    audio.currentTime = 0; // reinicia o áudio
    audio.play().catch(error => console.error("Erro ao reproduzir o som:", error)); // reproduz o som
}

function feedback(event) {
    event.preventDefault();

    var nome = document.getElementById("nome").value.trim(); // pega o valor do nome
    var email = document.getElementById("email").value.trim(); // pega o valor do email
    var nota = document.getElementById("nota_selecionada").value; // pega o valor da nota selecionada

    tocar_som_botao();

    if (!nome || !email || !nota) { // verifica se todos os campos estão preenchidos
        alert("Por favor, preencha todos os campos antes de enviar.");
        return;

    }

    var xhr = new XMLHttpRequest(); // cria um novo objeto XMLHttpRequest, que é usado para fazer requisições HTTP
    xhr.open("POST", "http://localhost:3000/feedback", true); // abre uma nova requisição HTTP do tipo POST para o URL especificado
    xhr.setRequestHeader("Content-Type", "application/json"); // define o cabeçalho da requisição para indicar que o corpo da requisição é um JSON
    xhr.onload = function () { // define uma função a ser executada quando a requisição for concluída
        if (xhr.status === 200) { // verifica se o status da resposta é 200 (OK)
            alert(xhr.responseText); // exibe a resposta do servidor em um alerta

            document.getElementById("nome").value = ''; // limpa o campo de nome
            document.getElementById("email").value = ''; // limpa o campo de email
            document.getElementById("nota_selecionada").value = '0'; // limpa o campo de nota selecionada
        } else {
            alert("Erro ao enviar feedback: " + xhr.responseText); // exibe uma mensagem de erro caso a requisição falhe
        }
    };

    xhr.send(JSON.stringify({ nome: nome, email: email, number: nota })); // envia a requisição com os dados do feedback em formato JSON
}

function tocar_botao(event, redirectUrl) { // função para tocar o som e redirecionar após o término
    event.preventDefault(); // previne o comportamento padrão do evento
    var audio = document.getElementById("som_botao"); // pega o elemento de áudio
    audio.currentTime = 0; // reinicia o áudio
    audio.play().then(() => { // tenta reproduzir o som
        audio.onended = function () { // define uma função a ser executada quando o áudio terminar
            window.location.href = redirectUrl; // redireciona para a URL especificada
        };
    }).catch(error => { // trata erros na reprodução do áudio
        console.error("Erro ao reproduzir o som:", error);
    });
}