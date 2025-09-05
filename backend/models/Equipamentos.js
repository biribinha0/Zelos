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

const verificarChamadoPatrimonio = async (patrimonio, tipoId) => {
    try {
        const chamado = await read('chamados', `patrimonio = ${patrimonio} AND status != 'concluído' AND tipo_id = ${tipoId}`);
        const res = chamado.length === 0 ? true : false;
        return res;
    } catch (error) {
        console.error('Erro ao verificar chamado com patrimonio: ', error);
        throw error;
    }
}

export { buscarEquipamentos, obterEquipamentoPorPatrimonio, verificarChamadoPatrimonio }