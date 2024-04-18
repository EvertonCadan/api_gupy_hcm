import express from 'express';
import T001CANController from './controllers/T001CANController';
import TestePS from './database/testeConexao';


const app = express();
const PORT = 3001;

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Definição das rotas para a primeira API
app.post('/api/T001CAN', T001CANController.insertJsonWebhook);
app.get('/api/T001CAN', T001CANController.findAll);

//TestePS();

// Definição das rotas para a segunda API
//app.post('/api/rota2', Rota2Controller.rota2Handler);

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
