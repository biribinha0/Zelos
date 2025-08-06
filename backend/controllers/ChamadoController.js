import { listarChamadosPublicos, criarChamado, listarChamadosPorUsuario, obterChamadoPorId, listarChamados, editarChamado } from "../models/Chamados.js";
import { listarApontamentosPorChamado } from "../models/Apontamentos.js";
import { obterPoolPorId } from "../models/Pools.js";
import { formatarTituloPool } from "../utils";
import { obterUsuarioPorId } from "../models/Usuarios.js";

const listarChamadosPublicosController = async (req, res) => {
    try {
        const chamados = await listarChamadosPublicos();

        // Filtra apenas título, descrição e tipo de chamado para uma rota pública
        const chamadosComPool = await Promise.all(
            chamados.map(async (chamado) => {
                const pool = await obterPoolPorId(chamado.tipo_id);

                return {
                    titulo: chamado.titulo,
                    descricao: chamado.descricao,
                    pool: pool ? formatarTituloPool(pool.titulo) : null
                };
            })
        );

        res.status(200).json(chamadosComPool)
    } catch (error) {
        console.error('Erro ao listar chamados públicos: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao listar os chamados públicos.' });
    }
}

const listarChamadosPorUsuarioController = async (req, res) => {
    const usuarioId = req.params.id
    try {
        const chamados = await listarChamadosPorUsuario(usuarioId);

        const chamadosComPool = await Promise.all(
            chamados.map(async (chamado) => {
                const pool = await obterPoolPorId(chamado.tipo_id);
                return {
                    ...chamado,
                    pool: pool ? formatarTituloPool(pool.titulo) : null
                }
            })
        )
        res.status(200).json(chamadosComPool);
    } catch (error) {
        console.error('Erro ao listar chamados por usuario: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao listar os chamados do usuário.' });
    }
}



const obterChamadoPorIdController = async (req, res) => {
    const chamadoId = req.params.id;
    try {
        const chamado = await obterChamadoPorId(chamadoId);

        if (!chamado) {
            return res.status(404).json({ error: 'Chamado não encontrado' })
        }
        const pool = await obterPoolPorId(chamado.tipo_id);
        const usuario = await obterUsuarioPorId(chamado.usuario_id, 'usuario');
        const tecnico = chamado.tecnico_id ? await obterUsuarioPorId(chamado.tecnico_id, 'usuario') : null;
        const apontamentos = await listarApontamentosPorChamado(chamadoId)

        const chamadoDetalhado = {
            ...chamado,
            pool: pool ? formatarTituloPool(pool.titulo) : null,
            usuario,
            tecnico,
            apontamentos
        }

        res.status(200).json(chamadoDetalhado);

    } catch (error) {
        console.error('Erro ao listar obter chamado por ID: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao obter os detalhes do chamado.' });
    }
}

const listarChamadosController = async (req, res) => {
    try {
        const chamados = await listarChamados();

        const chamadosDetalhados = await Promise.all(
            chamados.map(async (chamado) => {
                const pool = await obterPoolPorId(chamado.tipo_id);
                const usuario = await obterUsuarioPorId(chamado.usuario_id, 'usuario');
                const tecnico = chamado.tecnico_id ? await obterUsuarioPorId(chamado.tecnico_id, 'usuario') : null;
                const apontamentos = await listarApontamentosPorChamado(chamado.id);

                return {
                    ...chamado,
                    pool: pool ? formatarTituloPool(pool.titulo) : null,
                    usuario,
                    tecnico,
                    apontamentos,
                    apontamentos_qntd: apontamentos.length
                };
            })
        );

        res.status(200).json(chamadosDetalhados)
    } catch (error) {
        console.error('Erro ao listar chamados públicos: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao listar os chamados públicos.' });
    }
}

const criarChamadoController = async (req, res) => {
    const { titulo, descricao, tipo_id, usuario_id } = req.body
    if (!titulo || !descricao || !tipo_id || !usuario_id) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    try {
        const chamadoData = {
            titulo,
            descricao,
            tipo_id,
            usuario_id
        }

        const chamadoId = await criarChamado(chamadoData);
        return res.status(200).json({
            mensagem: 'Chamado registrado com sucesso.',
            chamadoId
        })
    } catch (error) {
        console.error('Erro ao criar chamado: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao criar o chamado.' });
    }
}



const editarChamadoController = async (req, res) => {
    const chamadoId = req.params.id;
    const { titulo, descricao, tipo_id, usuario_id, tecnico_id, status } = req.params

    if (!titulo || !descricao || !tipo_id || !usuario_id || !tecnico_id || !status) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    try {
        const chamadoData = {
            titulo,
            descricao,
            tipo_id,
            usuario_id,
            tecnico_id,
            status
        }

        const idChamado = await editarChamado(chamadoId, chamadoData);
        return res.status(200).json({
            mensagem: 'Chamado registrado com sucesso.',
            idChamado
        })
    } catch (error) {
        console.error('Erro ao editar chamado: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao editar o chamado.' });
    }
}

export { listarChamadosPublicosController, criarChamadoController, editarChamadoController, obterChamadoPorIdController, listarChamadosController, listarChamadosController, listarChamadosPorUsuarioController}