import { create, readAll } from '../config/database.js';

const listarApontamentosPorChamado = async (id) => {
  try {
    return await readAll('apontamentos',  `chamado_id = ${id}`);
  } catch (error) {
    console.error('Erro ao listar apontamentos:', error);
    throw error;
  }
};

const criarApontamento = async (apontamentoData) => {
  try {
    return await create('apontamentos', apontamentoData);
  } catch (error) {
    console.error('Erro ao criar apontamento:', error);
    throw error;
  }
};

export { listarApontamentosPorChamado, criarApontamento };