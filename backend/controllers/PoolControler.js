import { listarPools, obterPoolPorId, listarTecnicosPorPool, criarPool, editarPool, deletarPool } from "../models/Pools.js";
import { obterUsuarioPorId } from "../models/Usuarios.js";
import { carregarPoolsParaTecnico } from "../utils.js"

const listarPoolsController = async (req, res) => {
    try {
        const pools = await listarPools();
        return res.status(200), json(pools);
    } catch (error) {
        console.error('Erro ao listar pools: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao listar os tipos de chamados.' });
    }
}

const obterPoolPorIdController = async (req, res) => {
    const poolId = req.params.id;
    try {
        const pool = await obterPoolPorId(poolId);

        if (pool.status === 'inativo') return res.status(400).json({ error: 'Este tipo de manutenção foi desativado' });

        return res.status(200).json(pool);

    } catch (error) {
        console.error('Erro ao obter pool por ID: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao obter pool por ID.' });
    }
}

const listarTecnicosPorPoolController = async (req, res) => {
    const poolId = req.params.id;
    try {
        const pool_tecnicos = await listarTecnicosPorPool(poolId);
        const tecnicos = await Promise.all(
            pool_tecnicos.map(async ({ id_tecnico }) => {
                const tecnico = await obterUsuarioPorId(id_tecnico, 'tecnico');
                return {
                    ...pool_tecnicos,
                    tecnico
                }
            })
        )
        return res.status(200).json(tecnicos);

    } catch (error) {
        console.error('Erro ao listar técnicos por pool: ', error);
        return res.status(500).json({ error: 'Erro ao listar técnicos por tipo de manutenção.' });
    }
}

const listarPoolsPorTecnicoController = async (req, res) => {
    const tecnicoId = req.params.id;
    try {
        const pools = carregarPoolsParaTecnico(tecnicoId);
        return res.status(200).json(pools);
    } catch (error) {
        console.error('Erro ao listar pools por técnico: ', error);
        return res.status(500).json({ error: 'Erro ao listar pools por técnico.' });
    }
}

const criarPoolController = async (req, res) => {
    const { titulo, descricao, created_by, uptated_by } = req.body;
    if (!titulo || !descricao || !created_by || !uptated_by) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }
    const poolData = {
        titulo,
        descricao,
        created_by,
        uptated_by
    }
    try {
        const idPool = await criarPool(poolData);
        return res.status(200).json({
            mensagem: 'Pool criado com sucesso.',
            idPool
        });
    } catch (error) {
        console.error('Erro ao criar pool: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao criar o tipo de manutenção.' });
    }
}

const editarPoolController = async (req, res) => {
    const poolId = req.params.id;
    const { titulo, descricao, uptated_by } = req.body;
    if (!titulo || !descricao || !uptated_by) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }
    const poolData = {
        titulo,
        descricao,
        uptated_by
    }
    try {
        const idPool = await editarPool(poolId, poolData);
        return res.status(200).json({
            mensagem: 'Pool criado com sucesso.',
            idPool
        });
    } catch (error) {
        console.error('Erro ao editar pool: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao editar o tipo de manutenção.' });
    }
}

const deletarPoolController = async (req, res) => {
    const poolId = req.params.id;
    try {
        const idPool = await deletarPool(poolId)
        return res.status(200).json({
            mensagem: 'Pool deletado com sucesso.',
            idPool
        });
    } catch (error) {
        console.error('Erro ao deletar pool: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao deletar o tipo de manutenção.' });
    }
}

export {
    listarPoolsController, obterPoolPorId, listarPoolsPorTecnicoController, listarTecnicosPorPoolController, criarPoolController, editarPoolController, deletarPoolController
}