
import carros2024 from './tabelacarros.js';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (requisicao, resposta) =>{
    resposta.status(200).send(carros2024);
});

app.get ('/:sigla', (requisicao, resposta) => {
    const siglainformada = requisicao.params.sigla.toUpperCase();
    const carro = carros2024.find((infoCarro) => infoCarro.sigla === siglainformada)

    if (!carro){
        //Caso do campo estar vazio
        resposta.status(404).send('Não existe sigla informada')
        return;
    };
    resposta.status(200).send(carro); // se encontrada a sigla, retorna a tabela
})

app.post ('/', (req, res) => {
    const NovoCarro = req.body;
    carros2024.push(NovoCarro);
    res.status(200).send(NovoCarro);
}

)

app.put('/:sigla', (req, res) => {
    const siglainformada = req.params.sigla.toUpperCase();
    const carroselecionado = carros2024.find(c => c.sigla === siglainformada);
    if (!carroselecionado) {
        res.status(404).send('Não existe um carro com a sigla informada');
        return;
    };
    const campos = Object.keys(req.body);
    for (let campo of campos) {
        carroselecionado[campo] = req.body[campo];
    }
    res.status(200).send(carroselecionado)
    });

app.delete('/:sigla', (req,res) => {
    const siglainformada = req.params.sigla.toUpperCase();
    const indicecarroselecionado = carros2024.findIndex(
        (c) => c.sigla === siglainformada
    );
    if (indicecarroselecionado === -1) {
        res.status(404).send('Não existe um carro com a sigla informada');
        return;
    };
    const carroremovido = carros2024.splice(indicecarroselecionado, 1);
    res.status(200).send(carroremovido);
})


// inicia o servidor na porta 3000
app.listen(3000,() => console.log ("servidor Rodando Com Sucesso"));

// node.app.js
//localhost:3000/