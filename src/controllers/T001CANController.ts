// src/controllers/T001CANController.ts
import { Request, Response } from 'express';
import T001CANService from '../services/T001CANService';

// Controlador para a T001CAN
class T001CANController {
    // Insere com base no JSON passado no Webhook da Gupy
    async insertJsonWebhook(req: Request, res: Response) {
      // Extrai os dados do corpo da requisição
      const dados = req.body;
      console.log('Dados da primeira API:', dados);

      try {
        // Chama o serviço correspondente para processar os dados
        const sql = await T001CANService.insertJsonWebhook(dados);
        // Retorna uma resposta de sucesso
        res.send(dados);
      } catch (error) {
        // Se ocorrer um erro, retorna uma resposta de erro com status 500
        console.error('Erro ao processar os dados:', error);
        res.status(500).send('Erro ao processar os dados.');
      }
    }  

    // Consulta dados da tabela de candidados
    async findAll(req: Request, res: Response) {
      try {
          let id: number | undefined;
          const idParam = req.query.id as string;
          if (idParam && !isNaN(parseInt(idParam, 10))) {
              id = parseInt(idParam, 10);
          }
          
          const name = req.query.name as string;
          const identification_documento = req.query.identification_documento as string;

          const queryResult = await T001CANService.findAll(id, name, identification_documento);
          return res.send(queryResult);
      } catch (error: any) {
          return res.status(500).send(error.message);
      }
    }    
}

export default new T001CANController;