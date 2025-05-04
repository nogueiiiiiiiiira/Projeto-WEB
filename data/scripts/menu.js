let slide_atual = 0;

function mover_carousel(direcao) { // direcao: -1 para esquerda, 1 para direita
    const slides = document.querySelectorAll('.carousel__slide'); // seleciona todos os slides do carrossel
    const totalSlides = slides.length; // conta o número total de slides

    slide_atual = (slide_atual + direcao + totalSlides) % totalSlides; // atualiza o slide atual
    const offset = -slide_atual * 100; // calcula o deslocamento para o carrossel
    document.getElementById('carrousel_view').style.transform = `translateX(${offset}%)`; // aplica o deslocamento ao viewport do carrossel
}

function tocar_botao(event, redirectUrl) { // função para tocar botão
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

window.onload = function () { // função executada quando a página é carregada
    buscar_feedbacks(); // chama a função para obter feedbacks
};

function buscar_feedbacks() {
    fetch('http://localhost:3000/feedbacks') // faz uma requisição para obter os feedbacks
        .then(response => response.json()) // converte a resposta para JSON
        .then(data => { // processa a resposta
            const feedbacks_aleatorios = busca_feedbacks_aleatorios(data, 5); // obtém 5 feedbacks aleatórios
            feedbacks_aleatorios.forEach(feedback => { // para cada feedback
                const slide = document.createElement('div'); // cria um novo elemento div
                slide.className = 'carousel__slide'; // define a classe do slide
                slide.innerHTML = `<p><strong>Nome:</strong> ${feedback.nome}</p><p><strong>Nota:</strong> ${feedback.nota}</p>`; // define o conteúdo do slide
                document.getElementById('carrousel_view').appendChild(slide); // adiciona o slide ao viewport do carrossel
            });
        })
        .catch(error => { // trata erros na requisição
            console.error('Erro ao buscar feedbacks:', error);
        });
}

function busca_feedbacks_aleatorios(arr, num) { // função para obter feedbacks aleatórios
    const shuffled = arr.sort(() => 0.5 - Math.random()); // embaralha o array
    return shuffled.slice(0, num); // retorna os primeiros 'num' elementos do array embaralhado
}