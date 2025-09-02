import { create, readAll } from '../config/database.js';


const listarContatos = async () => {
  try {
    return await readAll('mensagens',  `tipo = contato`);
  } catch (error) {
    console.error('Erro ao listar contatos:', error);
    throw error;
  }
};


const listarFeedbacks= async () => {
  try {
    return await readAll('mensagens',  `tipo = feedback`);
  } catch (error) {
    console.error('Erro ao listar feedbacks:', error);
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

export { listarContatos, listarFeedbacks, criarMensagem };