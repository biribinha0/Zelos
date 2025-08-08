import { readRaw } from '../config/database.js';


async function relatorioChamadosPorStatus({ dataInicio, dataFim }) {
  const sql = `
    SELECT status, COUNT(*) as total
    FROM chamados
    WHERE data_abertura BETWEEN ? AND ?
    GROUP BY status
  `;
  return readRaw(sql, [dataInicio, dataFim]);
}

async function relatorioChamadosPorTipo({ dataInicio, dataFim }) {
  const sql = `
    SELECT tipo_chamado, COUNT(*) as total
    FROM chamados
    WHERE data_abertura BETWEEN ? AND ?
    GROUP BY tipo_chamado
  `;
  return readRaw(sql, [dataInicio, dataFim]);
}

async function relatorioAtividadesTecnicos({ dataInicio, dataFim, tecnicoId }) {
  let sql = `
    SELECT t.nome AS tecnico, COUNT(c.id) as total_chamados,
           AVG(TIMESTAMPDIFF(HOUR, c.data_abertura, c.data_fechamento)) as tempo_medio_horas
    FROM chamados c
    INNER JOIN tecnicos t ON c.tecnico_id = t.id
    WHERE c.data_abertura BETWEEN ? AND ?
  `;
  const params = [dataInicio, dataFim];

  if (tecnicoId) {
    sql += ' AND c.tecnico_id = ?';
    params.push(tecnicoId);
  }

  sql += ' GROUP BY t.id, t.nome';

  return readRaw(sql, params);
}

export {
  relatorioChamadosPorStatus,
  relatorioChamadosPorTipo,
  relatorioAtividadesTecnicos
};