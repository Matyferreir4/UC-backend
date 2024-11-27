
import carros2024 from './tabelacarros.js';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (requisicao, resposta) =>{
    resposta.status(200).send(carros2024);
});


// inicia o servidor na porta 3000
app.listen(3000,() => console.log ("servidor Rodando Com Sucesso"));

// node.app.js
//localhost:3000/