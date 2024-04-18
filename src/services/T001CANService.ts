import { Request } from 'express';
import pool from '../database/database.config';

class T001CANService {
    async insertJsonWebhook(req: Request) {
      const dados = req.body.data.candidate; // Obtém os dados do candidato do corpo da requisição

      // Monta a instrução SQL de inserção
      const sql = `
        INSERT INTO T001Can (
          name,
          last_name,
          email,
          identification_document,
          country_of_origin,
          birthdate,
          address_zip_code,
          address_street,
          address_number,
          address_city,
          address_state,
          address_country,
          mobile_number,
          schooling,
          schooling_status,
          disabilities,
          gender
        ) VALUES (
          '${dados.name}',
          '${dados.lastName}',
          '${dados.email}',
          '${dados.identificationDocument}',
          '${dados.countryOfOrigin}',
          '${dados.birthdate}',
          '${dados.addressZipCode}',
          '${dados.addressStreet}',
          '${dados.addressNumber}',
          '${dados.addressCity}',
          '${dados.addressState}',
          '${dados.addressCountry}',
          '${dados.mobileNumber}',
          '${dados.schooling}',
          '${dados.schoolingStatus}',
          ${dados.disabilities ? true : false},
          '${dados.gender}'
        )
      `;      

      try {
        // Executa a instrução SQL no banco de dados
        const result = await pool.query(sql);
        console.log('Inserção realizada com sucesso:', result.rows);
        return result.rows;
      } catch (error) {
        console.error('Erro ao executar SQL:', error);
        throw error;
      }

      
      // Retorna a instrução SQL para fins de exemplo (remova esta linha em produção)
      //return sql;
    }
  
    async findAll(id?: number, name?: string, identification_documento?: string) {
      try {
          let query = 'SELECT * FROM T001Can WHERE 1 = 1';
          const queryParams: any[] = [];

          if (id !== undefined) {
              query += ' AND id = $1';
              queryParams.push(id);
          }
          if (name !== undefined) {
              query += ' AND name ILIKE $2';
              queryParams.push(`%${name}%`);
          }
          if (identification_documento !== undefined) {
              query += ' AND identification_documento = $3';
              queryParams.push(identification_documento);
          }

          // Se nenhum filtro foi fornecido, limita a 100 registros
          if (queryParams.length === 0) {
              query += ' LIMIT 100';
          }

          const queryResult = await pool.query(query, queryParams);
          return queryResult.rows;
      } catch (error) {
          throw error;
      }
    }

}

export default new T001CANService();
