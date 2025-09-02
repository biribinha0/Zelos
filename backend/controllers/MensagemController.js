import { listarContatos, listarFeedbacks, criarMensagem } from "../models/Mensagens.js";

const listarMensagensController = async (req, res) => {
    try {
        const contatos = await listarContatos()
        const feedbacks = await listarFeedbacks();

        if (!contatos.length == 0 && feedbacks.length == 0) return res.status(404).json({ error: 'Nenhuma mensagem encontrada' })

        res.status(200).json({ contatos, feedbacks })
    } catch (error) {
        console.error('Erro ao ler mensagens: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao ler mensagens.' });
    }
}

const criarMensagemController = async (req, res) => {
    try {
        const { nome, email, titulo, mensagem, tipo } = req.body;
        if (!nome || !email || !mensagem || !tipo) res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' })

        const mensagemId = await criarMensagem({
            tipo,
            nome,
            email,
            titulo: titulo || null,
            mensagem
        })

        res.status(201).json({ mensagem: "Mensagem enviada com sucesso!", id: mensagemId });
    } catch (error) {
        console.error('Erro ao criar mensagem: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno ao criar mensagem.' });
    }
}

export { listarMensagensController, criarMensagemController }