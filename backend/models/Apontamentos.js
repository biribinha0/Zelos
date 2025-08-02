import { create, readAll } from '../config/database.js';

// Listagem de apontamentos de um chamado especifico
const listarApontamentosPorChamado = async (id) => {
  try {
    return await readAll('apontamentos',  `chamado_id = ${id} ORDER BY data_criacao ASC`);
  } catch (error) {
    console.error('Erro ao listar apontamentos:', error);
    throw error;
  }
};

// Criação de apontamentos por chamado
const criarApontamento = async (apontamentoData) => {
  try {
    return await create('apontamentos', apontamentoData);
  } catch (error) {
    console.error('Erro ao criar apontamento:', error);
    throw error;
  }
};

export { listarApontamentosPorChamado, criarApontamento };