import { create, readAll, read, update } from '../config/database.js';


// Lista de chamados para usuários sem login
const listarChamadosPublicos = async () => {
    try {
        return await readAll('chamados', `status = 'em andamento'`);
    } catch (error) {
        console.error('Erro ao listar chamados públicos: ', error);
        throw error;
    }
};

// Criação de chamada (para usuário)
const criarChamado = async (chamadoData) => {
    try {
        return await create('chamados', chamadoData);
    } catch (error) {
        console.error('Erro ao cruar chamado: ', error);
        throw error;
    }
};

// Lista de chamadas feitas por um usuários específico
const listarChamadosPorUsuario = async (id) => {
    try {
        return await readAll('chamados', `usuario_id = ${id} ORDER BY atualizado_em DESC`)
    } catch (error) {
        console.error('Erro ao listar chamados por usuário: ', error);
        throw error;
    }
}

// Lista de chamadas feitas por um usuários específico
const listarChamadosPorTecnico = async (id) => {
    try {
        return await readAll('chamados', `tecnico_id = ${id} ORDER BY atualizado_em DESC`)
    } catch (error) {
        console.error('Erro ao listar chamados por técnico: ', error);
        throw error;
    }
}

// Detalhes de um chamado específico
const obterChamadoPorId = async (id) => {
    try {
        return await read('chamados', `id = ${id}`)
    } catch (error) {
        console.error('Erro ao obter chamado por ID: ', error);
        throw error;
    }
}


// Permissões de Admin
// Ler todos os chamados 
const listarChamados = async () => {
    try {
        return await readAll('chamados', 'id > 0 ORDER BY atualizado_em DESC');
    } catch (error) {
        console.error('Erro ao listar chamados: ', error);
        throw error;
    }
};

//Editar chamado
const editarChamado = async (id, chamadoData) => {
    try {
        return await update('chamados', chamadoData, `id = ${id}`);
    } catch (error) {
        console.error('Erro ao editar chamado: ', error);
        throw error;
    }
};


// Chamados disponíveis para um técnico ser atribuído
const chamadosSemTecnico = async (whereClause = '') => {
    try {
        const baseCondition = `
            tecnico_id IS NULL 
            AND status IN ('pendente', 'em andamento')
        `;

        const finalCondition = whereClause 
            ? `${baseCondition} AND ${whereClause}` 
            : baseCondition;

        return await readAll('chamados', finalCondition);
    } catch (error) {
        console.error('Erro ao ler chamado para autoatribuição: ', error);
        throw error;
    }
};



export { listarChamadosPublicos, criarChamado, listarChamadosPorUsuario, obterChamadoPorId, listarChamados, editarChamado, chamadosSemTecnico, listarChamadosPorTecnico };
