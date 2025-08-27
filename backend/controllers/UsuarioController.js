import { listarUsuarios, obterUsuarioPorId, criarUsuario, editarUsuario } from "../models/Usuarios.js";

import { carregarPoolsParaTecnico, primeiroNomeInicial } from "../utils.js";
import { buscarEquipamentos, obterEquipamentoPorPatrimonio } from "../models/Equipamentos.js";
import e from "express";
import { contarChamadosPorUsuario, relatorioAtividadesTecnicos } from "../models/Relatorios.js";
import { gerarRelatorio } from "./RelatorioContoller.js";

function decimalHorasParaTempo(decimal) {
    const horas = Math.floor(decimal); // parte inteira
    const minutos = Math.round((decimal - horas) * 60); // converte parte decimal em minutos
    return `${horas}h ${minutos}min`;
}

const listarUsuariosController = async (req, res) => {
    const { funcao, status, email, nome } = req.query;
    const conditions = [];

    if (funcao) conditions.push(`funcao = '${funcao}'`);
    if (status) conditions.push(`status = '${status}'`);
    if (email) conditions.push(`email LIKE '%${email}%'`);
    if (nome) conditions.push(`nome LIKE '%${nome}%'`);

    const whereClause = conditions.length > 0 ? conditions.join(" AND ") : "";

    try {
        const usuarios = await listarUsuarios(whereClause);

        await Promise.all(
            usuarios.map(async (usuario) => {
                // Garante que o id existe antes de usar
                if (!usuario.id) {
                    usuario.chamadosEmAndamento = 0;
                    usuario.chamadosConcluidos = 0;
                    usuario.tempoMedio = 0;
                    usuario.pools = [];
                    usuario.nomeFormatado = primeiroNomeInicial(usuario.nome || "");
                    return;
                }

                if (usuario.funcao === "tecnico") {
                    usuario.pools = await carregarPoolsParaTecnico(usuario.id);
                    function formatDate(date) {
                        return date.toISOString().slice(0, 19).replace('T', ' ');
                    }

                    const init = formatDate(new Date('2025-07-01 00:00:00'));
                    const end = formatDate(new Date());

                    const relatorio = await relatorioAtividadesTecnicos({
                        dataInicio: init,
                        dataFim: end,
                        tecnicoId: usuario.id
                    });
                    const timeFormatted = relatorio[0]?.tempo_medio_horas || 0;
                    usuario.tempoMedio = timeFormatted === 0 ? timeFormatted : decimalHorasParaTempo(timeFormatted);
                }

                usuario.nomeFormatado = primeiroNomeInicial(usuario.nome);

                // contar chamados para ambos
                const counts = await contarChamadosPorUsuario(usuario.id);
                usuario.chamadosEmAndamento = counts?.em_andamento ?? 0;
                usuario.chamadosConcluidos = counts?.concluido ?? 0;
            })
        );

        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar usuário: ", error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

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
    const { nome, senha, email, funcao, status } = req.body;
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
        const response = await editarUsuario(usuarioData, usuarioId)
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
        console.error('Erro ao buscar equipamentos: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar equipamentos.' });
    }
}

const mudarStatusController = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    try {
        if (!status || !id) return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' });

        if (status !== 'ativo' && status !== 'inativo') return res.status(400).json({ error: 'Status inválido' });
        const user = await obterUsuarioPorId(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const response = await editarUsuario({ status }, id);
        return res.status(200).json({ mensagem: 'Usuário editado com sucesso', response })
    } catch (error) {
        console.error('Erro ao mudar status: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao mudar status.' });
    }
}

export { listarUsuariosController, obterUsuarioPorIdController, criarUsuarioController, editarUsuarioController, buscarEquipamentosController, mudarStatusController }