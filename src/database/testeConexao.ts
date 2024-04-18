import pool from './database.config';

function TestePS() {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Erro ao conectar ao PostgreSQL:', err);
    } else {
      // Verifica se há resultados da consulta
      if (res.rows.length > 0) {
        console.log('Conexão com PostgreSQL estabelecida com sucesso! Resultado:', res.rows[0]);
      } else {
        console.error('Erro: Nenhum resultado retornado da consulta.');
      }
    }
    pool.end(); // Termina a conexão
  });
}

export default TestePS;