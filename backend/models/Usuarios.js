import { create, readAll, read, update, deleteRecord } from '../config/database.js';

// Listar Usuarios
const listarUsuarios= async () => {
    try {
        return await readAll
    } catch (error) {
        
    }
} 

// Listar Usuarios por tipo
const listarUsuariosPorTipo = async (tipo) => {
    try {
        return await readAll('usuarios', `funcao = ${tipo} AND status = ativo`)
    } catch (error) {
        console.error('Erro ao listar usuariospor tipo: ', error);
        throw error;
    }
}
