import { readAll, read } from '../config/database.js';

// Lista de pools disponíveis
const buscarEquipamentos = async (whereClause) => {
    try {
        return await readAll('equipamentos', `${whereClause}`);
    } catch (error) {
        console.error('Erro ao buscar equipamentos: ', error);
        throw error;
    }
};

// Lista de pools disponíveis
const obterEquipamentoPorPatrimonio = async (patrimonio) => {
    try {
        return await read('equipamentos', `patrimonio = ${patrimonio}`);
    } catch (error) {
        console.error('Erro ao obter equipamento por patrimônio: ', error);
        throw error;
    }
};

export { buscarEquipamentos, obterEquipamentoPorPatrimonio }