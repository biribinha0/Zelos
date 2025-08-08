import {
    relatorioChamadosPorStatus,
    relatorioChamadosPorTipo,
    relatorioAtividadesTecnicos
} from '../models/Relatorios.js';

export const gerarRelatorio = async (req, res) => {
    try {
        const { tipoRelatorio, dataInicio, dataFim, tecnicoId } = req.query;

        // Validação básica dos parâmetros obrigatórios
        if (!tipoRelatorio || !dataInicio || !dataFim) {
            return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes.' });
        }

        let dados;

        switch (tipoRelatorio) {
            case 'status':
                dados = await relatorioChamadosPorStatus({ dataInicio, dataFim });
                break;
            case 'tipo':
                dados = await relatorioChamadosPorTipo({ dataInicio, dataFim });
                break;
            case 'atividades-tecnicos':
                dados = await relatorioAtividadesTecnicos({ dataInicio, dataFim, tecnicoId });
                break;
            default:
                return res.status(400).json({ error: 'Tipo de relatório inválido.' });
        }

        if (!dados || dados.length === 0) {
            return res.status(404).json({ error: 'Nenhum dado encontrado para os filtros aplicados.' });
        }

        return res.status(200).json({ relatorio: dados });

    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        return res.status(500).json({ error: 'Erro interno ao gerar relatório.' });
    }
};
