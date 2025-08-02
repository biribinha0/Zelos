import { create, readAll, read, update } from '../config/database.js';

// Listar Usuarios por tipo
const listarUsuarios = async (where) => {
    try {
        return await readAll('usuarios', `${where}`);
    } catch (error) {
        console.error('Erro ao listar usuarios: ', error);
        throw error;
    }
}

// Obtém usuario pelo id e função
const obterUsuarioPorId = async (id, funcao) => {
    try {
        return await read('usuarios', `id = ${id} AND funcao = ${funcao}`)
    } catch (error) {
        console.error('Erro ao obter usuario por id: ', error);
        throw error;
    }
}


// funções de admin

// Criação de usuario
const criarUsuario = async (usuarioData) => {
    try {
        return await create('usuarios', usuarioData);
    } catch (error) {
        console.error('Erro ao criar usuario: ', error);
        throw error;
    }
}

// Edição de usuário
const editarUsuario = async (usuarioData, id) => {
    try {
        return await update('usuarios', usuarioData, `id = ${id}`);
    } catch (error) {
        console.error('Erro ao atualizar usuario: ', error);
        throw error;
    }
}

export {listarUsuarios, obterUsuarioPorId, criarUsuario, editarUsuario}