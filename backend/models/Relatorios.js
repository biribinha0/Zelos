import { readRaw } from '../config/database.js';
import { formatarTituloPool } from "../utils.js";


async function relatorioChamadosPorStatus({ dataInicio, dataFim }) {
  const sql = `
    SELECT status, COUNT(*) as total
    FROM chamados
    WHERE criado_em BETWEEN ? AND ?
    GROUP BY status
  `;
  return readRaw(sql, [dataInicio, dataFim]);
}

async function relatorioChamadosPorTipo({ dataInicio, dataFim }) {
  const sql = `
    SELECT p.titulo AS tipo_chamado, COUNT(*) AS total
    FROM chamados c
    INNER JOIN pool p ON c.tipo_id = p.id
    WHERE c.criado_em BETWEEN ? AND ?
    GROUP BY p.titulo
  `;

  // Esperar o resultado da busca
  const data = await readRaw(sql, [dataInicio, dataFim]);


  // Formata o título da pool
  return data.map(item => ({
    tipo_chamado: formatarTituloPool(item.tipo_chamado),
    total: item.total
  }));
}


async function relatorioAtividadesTecnicos({ dataInicio, dataFim, tecnicoId }) {
  let sql = `
    SELECT u.nome AS usuario,
           COUNT(c.id) AS total_chamados,
           AVG(TIMESTAMPDIFF(HOUR, c.criado_em, c.atualizado_em)) AS tempo_medio_horas
    FROM chamados c
    INNER JOIN usuarios u ON c.tecnico_id = u.id
    WHERE c.criado_em BETWEEN ? AND ?
      AND c.status = 'concluído'
  `;

  const params = [dataInicio, dataFim];

  if (tecnicoId) {
    sql += ' AND c.usuario_id = ?';
    params.push(tecnicoId);
  }

  sql += ' GROUP BY u.id, u.nome';

  return readRaw(sql, params);
}


export {
  relatorioChamadosPorStatus,
  relatorioChamadosPorTipo,
  relatorioAtividadesTecnicos
};