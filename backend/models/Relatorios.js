import { read, readRaw } from '../config/database.js';
import { formatarTituloPool } from "../utils.js";
import { obterUsuarioPorId } from './Usuarios.js';


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
    SELECT
      u.id  AS tecnico_id,
      u.nome AS usuario,
      COUNT(c.id) AS total_chamados,
      ROUND(AVG(TIMESTAMPDIFF(SECOND, c.criado_em, c.atualizado_em)) / 3600, 2) AS tempo_medio_horas
    FROM chamados c
    INNER JOIN usuarios u ON c.tecnico_id = u.id
    WHERE c.status = 'concluído'
      -- escolha 1: filtrar pelo período de criação do chamado
      AND c.criado_em >= ? AND c.criado_em < DATE_ADD(?, INTERVAL 1 DAY)
  `;

  const params = [dataInicio, dataFim];

  if (tecnicoId) {
    sql += ' AND c.tecnico_id = ?';
    params.push(tecnicoId);
  }

  sql += ' GROUP BY u.id, u.nome ORDER BY total_chamados DESC';

  return readRaw(sql, params);
}

async function relatorioChamadosPorTipoEStatus({ status, dataInicio, dataFim }) {
  const sql = `
    SELECT 
      p.titulo AS tipo_chamado,
      COUNT(c.id) AS total
    FROM pool p
    LEFT JOIN chamados c 
      ON c.tipo_id = p.id 
      AND c.status = ? 
      AND c.criado_em BETWEEN ? AND ?
    GROUP BY p.titulo
    ORDER BY FIELD(p.titulo, 'manutencao', 'apoio_tecnico', 'externo', 'limpeza')
  `;

  const data = await readRaw(sql, [status, dataInicio, dataFim]);

  return data.map(item => ({
    tipo_chamado: formatarTituloPool(item.tipo_chamado),
    total: item.total
  }));
}

async function contarChamadosPorUsuario(usuarioId) {
  const usuario = await read("usuarios", `id = ${usuarioId}`);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const funcaoMap = {
    tecnico: "tecnico_id",
    usuario: "usuario_id",
  };

  const coluna = funcaoMap[usuario.funcao];
  if (!coluna) {
    throw new Error(`Função '${usuario.funcao}' não é válida`);
  }

  const sql = `
    SELECT status, COUNT(*) as total
    FROM chamados
    WHERE ${coluna} = ?
    GROUP BY status
  `;

  const result = await readRaw(sql, [usuarioId]);

  const counts = { em_andamento: 0, concluido: 0 };
  result.forEach((r) => {
    if (r.status === "em andamento") counts.em_andamento = r.total;
    if (r.status === "concluído") counts.concluido = r.total;
  });

  return counts;
}




export {
  relatorioChamadosPorStatus,
  relatorioChamadosPorTipo,
  relatorioAtividadesTecnicos,
  relatorioChamadosPorTipoEStatus,
  contarChamadosPorUsuario
};