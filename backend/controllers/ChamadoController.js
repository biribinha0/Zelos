import { listarChamadosPublicos, criarChamado, listarChamadosPorUsuario, listarChamadosPorTecnico, obterChamadoPorId, listarChamados, editarChamado, chamadosSemTecnico } from "../models/Chamados.js";
import { listarApontamentosPorChamado } from "../models/Apontamentos.js";
import { obterPoolPorId, listarPoolsPorTecnico } from "../models/Pools.js";
import { formatarTituloPool } from "../utils.js";
import { obterUsuarioPorId } from "../models/Usuarios.js";
import { obterEquipamentoPorPatrimonio } from "../models/Equipamentos.js";
import { formatarNome } from '../utils.js';


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
                let tecnico = null;
                if (chamado.tecnico_id) {
                    tecnico = await obterUsuarioPorId(chamado.tecnico_id, 'tecnico');
                }
                let patrimonio = null;
                if (chamado.patrimonio !== null) {
                    patrimonio = await obterEquipamentoPorPatrimonio(patrimonio)
                }
                return {
                    ...chamado,
                    pool: pool ? formatarTituloPool(pool.titulo) : null,
                    patrimonio: patrimonio ? patrimonio : null,
                    tecnico: tecnico ? tecnico.nome : null
                };
            })
        )
        res.status(200).json(chamadosComPool);
    } catch (error) {
        console.error('Erro ao listar chamados por usuario: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao listar os chamados do usuário.' });
    }
}

const listarChamadosPorTecnicoController = async (req, res) => {
    const tecnicoId = req.params.id
    try {
        const chamados = await listarChamadosPorTecnico(tecnicoId);

        if (chamados.length === 0) return res.status(204)

        const chamadosComPool = await Promise.all(
            chamados.map(async (chamado) => {
                const pool = await obterPoolPorId(chamado.tipo_id);
                const usuario = await obterUsuarioPorId(chamado.usuario_id, 'usuario')
                let patrimonio = null;
                if (chamado.patrimonio !== null) {
                    patrimonio = await obterEquipamentoPorPatrimonio(patrimonio)
                }
                return {
                    ...chamado,
                    pool: pool ? formatarTituloPool(pool.titulo) : null,
                    patrimonio: patrimonio ? patrimonio : null,
                    usuario: await formatarNome(usuario.nome)
                }
            })
        )
        res.status(200).json(chamadosComPool);
    } catch (error) {
        console.error('Erro ao listar chamados por tecnico: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao listar os chamados do técnico.' });
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
        const tecnico = chamado.tecnico_id ? await obterUsuarioPorId(chamado.tecnico_id, 'tecnico') : null;
        const apontamentos = await listarApontamentosPorChamado(chamadoId)
        let patrimonio = null;
        if (chamado.patrimonio !== null) {
            patrimonio = await obterEquipamentoPorPatrimonio(chamado.patrimonio)
        }
        const chamadoDetalhado = {
            ...chamado,
            pool: pool ? formatarTituloPool(pool.titulo) : null,
            patrimonio: patrimonio ? patrimonio : null,
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
                let patrimonio = [];
                if (chamado.patrimonio !== null) {
                    patrimonio = await obterEquipamentoPorPatrimonio(patrimonio)
                }
                return {
                    ...chamado,
                    pool: pool ? formatarTituloPool(pool.titulo) : null,
                    patrimonio: patrimonio ? patrimonio : null,
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
    const { titulo, descricao, tipo_id, usuario_id, patrimonio } = req.body
    if (!titulo || !descricao || !tipo_id || !usuario_id) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    try {
        const chamadoData = {
            titulo,
            descricao,
            tipo_id,
            usuario_id,
            patrimonio: patrimonio ? patrimonio : null
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
    const { titulo, descricao, tipo_id, usuario_id, tecnico_id, status, patrimonio } = req.params

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
            status,
            patrimonio: patrimonio ? patrimonio : null
        }

        const idChamado = await editarChamado(chamadoId, chamadoData);
        return res.status(200).json({
            mensagem: 'Chamado editado com sucesso.',
            idChamado
        })
    } catch (error) {
        console.error('Erro ao editar chamado: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao editar o chamado.' });
    }
}

const chamadosSemTecnicoController = async (req, res) => {
    const tecnicoId = req.params.id;
    try {
        const poolsTecnico = await listarPoolsPorTecnico(tecnicoId);

        const chamadosPorPool = await Promise.all(
            poolsTecnico.map(({ id_pool }) =>
                chamadosSemTecnico(`tipo_id = ${id_pool}`)
            )
        );

        const chamados = chamadosPorPool.flat();

        return res.status(200).json(chamados);
    } catch (error) {
        console.error('Erro ao buscar chamados para autoatribuição: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar chamados para autoatribuição.' });
    }
};


const autoAtribuirAoChamadoController = async (req, res) => {
    const chamadoId = req.params.id;
    const { tecnico_id } = req.body;

    if (!tecnico_id) {
        return res.status(400).json({ error: 'O campo tecnico_id é obrigatório.' });
    }

    try {
        const chamado = await obterChamadoPorId(chamadoId);
        if (chamado.tecnico_id !== null) {
            return res.status(500).json({ error: 'O chamado já possui um técnico atribuído.' });

        }
        const idChamado = await editarChamado(chamadoId, { tecnico_id, status: 'em andamento' });

        if (!idChamado) {
            return res.status(404).json({ error: 'Chamado não encontrado.' });
        }


        return res.status(200).json({
            mensagem: 'Chamado autoatribuído com sucesso.',
            idChamado
        });
    } catch (error) {
        console.error('Erro ao editar chamado: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao editar o chamado.' });
    }
};

const fecharChamadoController = async (req, res) => {
    const chamadoId = req.params.id;
    try {
        const idChamado = await editarChamado(chamadoId, { status: 'concluído' });

        if (!idChamado) {
            return res.status(404).json({ error: 'Chamado não encontrado.' });
        }

        return res.status(200).json({
            mensagem: 'Chamado fechado com sucesso.',
            idChamado
        });
    } catch (error) {
        console.error('Erro ao fechar o chamado: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao fechar o chamado.' });
    }
}




export {
    listarChamadosPublicosController,
    criarChamadoController,
    editarChamadoController,
    obterChamadoPorIdController,
    listarChamadosController,
    listarChamadosPorUsuarioController,
    listarChamadosPorTecnicoController,
    chamadosSemTecnicoController,
    autoAtribuirAoChamadoController,
    fecharChamadoController
}