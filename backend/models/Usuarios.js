import { create, readAll, read, update } from '../config/database.js';
import { formatarNome } from '../utils.js';

// Listar Usuarios por tipo
const listarUsuarios = async (where) => {
    try {
        const usuarios = await readAll('usuarios', where ? `${where}` : "");
        const usuariosFormatados = usuarios.map(u => ({
            ...u,
            nome: formatarNome(u.nome)
        }));

        return usuariosFormatados;
    } catch (error) {
        console.error('Erro ao listar usuarios: ', error);
        throw error;
    }
}

// Obtém usuario pelo id e função
const obterUsuarioPorId = async (id, funcao) => {
    try {
        const usuario = await read('usuarios', `id = ${id} AND funcao = '${funcao}'`);
        return {
            ...usuario,
            nome: formatarNome(usuario.nome)
        }
    } catch (error) {
        console.error('Erro ao obter usuario por id: ', error);
        throw error;
    }
}

const verificarCadastro = async (id, email) => {
    try {
        return await read('usuarios', `id = ${id} OR email = '${email}'`);
    } catch (error) {
        console.error('Erro ao verificar cadastro: ', error);
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

export { listarUsuarios, obterUsuarioPorId, criarUsuario, editarUsuario, verificarCadastro }