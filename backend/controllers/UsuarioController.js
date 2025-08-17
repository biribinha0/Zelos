import { listarUsuarios, obterUsuarioPorId, criarUsuario, editarUsuario } from "../models/Usuarios.js";

import { carregarPoolsParaTecnico } from "../utils.js";
import { buscarEquipamentos, obterEquipamentoPorPatrimonio } from "../models/Equipamentos.js";
import e from "express";

const listarUsuariosController = async (req, res) => {
    const { funcao, status, email, nome } = req.query;

    // Armazenar individualmente
    const conditions = [];

    if (funcao) {
        conditions.push(`funcao = '${funcao}'`);
    }
    if (status) {
        conditions.push(`status = '${status}'`);
    }
    if (email) {
        conditions.push(`email LIKE '%${email}%'`);
    }
    if (nome) {
        conditions.push(`nome LIKE '%${nome}%'`);
    }

    // Se tiver condições, coloca AND entre as condições, se não, retorna tudo
    const whereClause = conditions.length > 0 ? `${conditions.join(' AND ')}` : '';


    try {
        const usuarios = await listarUsuarios(whereClause);

        // Verifica se tem algum técnico na lista
        const temTecnico = funcao === 'tecnico' || usuarios.some(u => u.funcao === 'tecnico');

        // Se tiver técnico, colocar as pools no retorno
        if (temTecnico) {
            await Promise.all(usuarios.map(async (usuario) => {
                if (usuario.funcao === 'tecnico') {
                    usuario.pools = await carregarPoolsParaTecnico(usuario.id);
                }
            }))
        }
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuário: ', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
}

const obterUsuarioPorIdController = async (req, res) => {
    const usuarioId = req.params.id
    try {
        const usuario = obterUsuarioPorId(usuarioId)
        if (usuario.funcao === 'tecnico') {
            usuario.pools = await carregarPoolsParaTecnico(usuario.id);
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao obter usuário por ID: ', error);
        res.status(500).json({ error: 'Erro ao obter dados do usuário' })
    }
}

const criarUsuarioController = async (req, res) => {
    const { nome, senha, email, funcao } = req.body;

    if (!nome || !senha || !email || !funcao) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const usuarioData = {
        nome,
        senha,
        email,
        funcao
    }

    try {
        const usuarioId = await criarUsuario(usuarioData)
        return res.status(200).json({
            mensagem: 'Usuario criado com sucesso.',
            usuarioId
        });
    } catch (error) {
        console.error('Erro ao criar usuário: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao criar o usuário.' });
    }
}

const editarUsuarioController = async (req, res) => {
    const { nome, senha, email, funcao } = req.body;
    const usuarioId = req.params.id;

    if (!nome || !senha || !email || !funcao) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const usuarioData = {
        nome,
        senha,
        email,
        funcao
    }

    try {
        const response = await editarUsuario(usuarioData)
        return res.status(200).json({
            mensagem: 'Usuario editado com sucesso.',
            response
        });
    } catch (error) {
        console.error('Erro ao editar usuário: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao editar o usuário.' });
    }
}

const buscarEquipamentosController = async (req, res) => {
    const { patrimonio, sala, equipamento } = req.query
    // Armazenar individualmente
    const conditions = [];

    if (patrimonio) {
        conditions.push(`PATRIMONIO LIKE '%${patrimonio}%'`);
    }
    if (sala) {
        conditions.push(`SALA LIKE '%${sala}%'`);
    }
    if (equipamento) {
        conditions.push(`EQUIPAMENTO LIKE '%${equipamento}%'`);
    }

    // Se tiver condições, coloca AND entre as condições, se não, retorna tudo
    const whereClause = conditions.length > 0 ? `${conditions.join(' AND ')}` : '';
    try {
        const equipamentos = await buscarEquipamentos(whereClause);

        return res.status(200).json(equipamentos)
    } catch (error) {

    }
}
export { listarUsuariosController, obterUsuarioPorIdController, criarUsuarioController, editarUsuarioController, buscarEquipamentosController }