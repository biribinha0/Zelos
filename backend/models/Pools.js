import { create, readAll, read, update } from '../config/database.js';

// Lista de pools disponíveis
const listarPools = async () => {
    try {
        return await readAll('pool', `status = 'ativo'`);
    } catch (error) {
        console.error('Erro ao listar pools: ', error);
        throw error;
    }
};

// Obter pool por id
const obterPoolPorId = async (id) => {
    try {
        return await read('pool', `id = ${id}`);
    } catch (error) {
        console.error('Erro ao obter pool por Id: ', error);
        throw error;
    }
}


// Lista de pools que um técnico pode fazer
const listarPoolsPorTecnico = async (id) => {
    try {
        return await readAll('pool_tecnico', `id_tecnico = ${id}`);
    } catch (error) {
        console.error('Erro ao listar pools por técnico: ', error);
        throw error;
    }
};

// Lista de técnicos que podem fazer uma pool
const listarTecnicosPorPool = async (id) => {
    try {
        return await readAll('pool_tecnico', `id_pool = ${id}`);
    } catch (error) {
        console.error('Erro ao listar técnicos por pool: ', error);
        throw error;
    }
};

// Criar novo tipo de manutenção
const criarPool = async (poolData) => {
    try {
        return await create('pool', poolData);
    } catch (error) {
        console.error('Erro ao criar pool: ', error);
        throw error;
    }
}

// Editar tipo de manutenção
const editarPool = async (id, poolData) => {
    try {
        return await update('pool', poolData, `id = ${id}`)
    } catch (error) {
        console.error('Erro ao editar pool: ', error);
        throw error;
    }
}

// Deletar (desativar) tipo de manutenção
const deletarPool = async (id) => {
    try {
        return await update('pool', { status: 'inativo' }, `id = ${id}`)
    } catch (error) {
        console.error('Erro ao editar pool: ', error);
        throw error;
    }
}


export { listarPools, obterPoolPorId, listarPoolsPorTecnico, listarTecnicosPorPool, criarPool, editarPool, deletarPool }