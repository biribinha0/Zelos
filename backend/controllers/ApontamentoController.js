import { criarApontamento } from "../models/Apontamentos.js";
import { obterChamadoPorId } from "../models/Chamados.js";
import { obterUsuarioPorId } from "../models/Usuarios.js";


const criarApontamentoController = async (req, res) => {
    const { chamado_id, tecnico_id, descricao, comeco, fim } = req.body;

    if (!chamado_id || !tecnico_id || !descricao || !comeco || !fim) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    if (new Date(fim) <= new Date(comeco)) {
        return res.status(400).json({ error: 'A data de fim deve ser posterior à de começo.' });
    }

    try {
        // Verifica se o chamado existe
        const chamado = await obterChamadoPorId(chamado_id);
        if (!chamado) return res.status(404).json({ error: 'Chamado não encontrado.' });

        // Verifica se o técnico existe
        const tecnico = await obterUsuarioPorId(tecnico_id, 'tecnico')
        if (!tecnico) return res.status(404).json({ error: 'Técnico não encontrado.' });

        // Objeto a ser enviado ao banco
        const apontamentoData = {
            chamado_id,
            tecnico_id,
            descricao,
            comeco,
            fim
        }

        // Cria o usuário no banco
        const apontamentoId = await criarApontamento(apontamentoData);

        return res.status(201).json({
            mensagem: 'Apontamento registrado com sucesso.',
            apontamentoId
        })
    } catch (error) {
        console.error('Erro ao registrar apontamento: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao criar apontamento.' });
    }
}

export { criarApontamentoController };