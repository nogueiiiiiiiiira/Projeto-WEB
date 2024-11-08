const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// conexao com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'projetoweb'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// rota para receber feedback
app.post('/feedback', (req, res) => {
    const { nome, email, number } = req.body;
    const sql = 'INSERT INTO feedback_db (nome, email, nota) VALUES (?, ?, ?)';

    db.query(sql, [nome, email, number], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao inserir dados: ' + err);
        }
        res.send('Feedback enviado com sucesso!');
    });
});

app.get('/feedbacks', (req, res) => {
    const sql = 'SELECT nome, nota FROM feedback_db ORDER BY RAND() LIMIT 5'; // pega 5 registros aleatorios
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar dados: ' + err);
        }
        res.json(results);
    });
    
});

// inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

