require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa o pacote CORS

const app = express(); // Inicialização do servidor express
const port = process.env.PORT || 5500;

app.use(cors());

app.get('/api/weather', async function(req, res){ // As variáveis req e res (requisição e resposta) são automaticamente
                                                  // identificadas pelo Express
                                                  console.log('Solicitacao recebida');
    const location = req.query.location;
    const key = process.env.OPENWEATHERMAP_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric&lang=pt_br`;

    try {
        const response = await axios.get(url)
        console.log(response.data)
        res.status(200).json(response.data);
    }
    catch(error) {
        if (error.response) {
            // A API de clima respondeu com um erro (ex.: status 404 ou 500)
            console.log(`Status da resposta da API (erro): ${error.response.status}`);
            console.error('Erro ao buscar dados da API:', error.response.data);

            // Envia o status do erro e a mensagem de volta para o frontend
            res.status(error.response.status).json({ error: 'Erro ao buscar dados da API', details: error.response.data });
        } else if (error.request) {
            // A requisição foi enviada, mas não houve resposta
            console.error('Nenhuma resposta recebida da API:', error.request);
            res.status(500).json({ error: 'Nenhuma resposta recebida da API' });
        } else {
            // Ocorreu algum outro erro na configuração da requisição
            console.error('Erro na configuração da requisição:', error.message);
            res.status(500).json({ error: 'Erro na configuração da requisição' });
        }    
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});