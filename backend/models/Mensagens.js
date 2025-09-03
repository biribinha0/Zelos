import { create, readAll } from '../config/database.js';


const listarContatos = async () => {
  try {
    return await readAll('mensagens', `tipo = 'contato' ORDER BY criado_em DESC`);
  } catch (error) {
    console.error('Erro ao listar contatos:', error);
    throw error;
  }
};


const listarFeedbacks = async () => {
  try {
    return await readAll('mensagens', `tipo = 'feedback'  ORDER BY criado_em DESC`);
  } catch (error) {
    console.error('Erro ao listar feedbacks:', error);
    throw error;
  }
};

const listarErrosTipo = async () => {
  try {
    return await readAll('mensagens',  `tipo = 'erro_tipo'  ORDER BY criado_em DESC`);
  } catch (error) {
    console.error('Erro ao listar erros de tipo:', error);
    throw error;
  }
};


const criarMensagem = async (mensagemData) => {
  try {
    return await create('mensagens', mensagemData);
  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    throw error;
  }
};

export { listarContatos, listarFeedbacks,listarErrosTipo, criarMensagem };