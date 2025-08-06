import { listarPools, obterPoolPorId, listarPoolsPorTecnico, listarTecnicosPorPool, criarPool, editarPool, deletarPool } from "../models/Pools.js";

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

        res.status(200).json(pool);

    } catch (error) {
        console.error('Erro ao obter pool por ID: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao obter pool por ID.' });
    }
}

const listarTecnicosPorPoolController = async (req, res) => {
    const poolId = req.params.id;
    try {
        const pool_tecnicos = await listarTecnicosPorPool(poolId) 
    } catch (error) {
        
    }
}
