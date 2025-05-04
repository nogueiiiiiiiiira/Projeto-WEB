# ♻️ Recycle Right - Projeto WEB

Este projeto é uma aplicação web chamada "Recycle Right" que tem como objetivo educar e incentivar a correta separação de resíduos através de um jogo interativo. A aplicação é composta por um frontend em HTML, CSS e JavaScript, e um backend em Node.js com Express que se conecta a um banco de dados MySQL para armazenar feedback dos usuários.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js com Express
- **Banco de Dados:** MySQL
- **Dependências:** Express, MySQL, CORS, Body-Parser

---

## 🧰 Requisitos para Rodar o Projeto

1. **XAMPP:**
   - Instale o XAMPP para ter o servidor Apache e o MySQL rodando localmente.
   - Inicie o Apache e o MySQL pelo painel de controle do XAMPP.

2. **Banco de Dados MySQL:**
   - Acesse o phpMyAdmin (geralmente em http://localhost/phpmyadmin).
   - Crie um banco de dados chamado `recycleright`:
     ```sql
     CREATE DATABASE recycleright;
     ```
   - Selecione o banco `recycleright` e crie a tabela `feedback_db` com a seguinte estrutura:
     ```sql
     CREATE TABLE feedback_db (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nome VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       nota INT NOT NULL
     );
     ```

3. **Configuração do Backend:**
   - No arquivo `pages/server.js`, configure as credenciais do banco de dados conforme seu ambiente (usuário, senha, host).
   - Instale as dependências do Node.js:
     ```
     npm install express mysql body-parser cors
     ```
   - Inicie o servidor backend:
     ```
     cd pages
     node server.js
     ```
   - 🔗 O servidor estará rodando em `http://localhost:3000`.

4. **Frontend:**
   - Abra o arquivo `pages/jogo.html` no navegador para acessar o jogo.
   - Certifique-se de que o backend e o banco de dados estejam rodando para funcionalidades que dependem do servidor, como envio de feedback.

---

## 🎮 Uso

- Jogue o jogo de separação de lixo no frontend.
- Envie feedback através do formulário disponível (se houver).
- O backend armazenará os feedbacks no banco de dados MySQL.

---

## ⚠️ Observações

- Certifique-se de que o MySQL esteja rodando antes de iniciar o backend.
- Ajuste as configurações de conexão no `server.js` conforme necessário.
- Para qualquer dúvida ou problema, verifique os logs do servidor Node.js para mensagens de erro.
