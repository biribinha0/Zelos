import express from "express";
import { chamadosSemTecnicoController, autoAtribuirAoChamadoController, obterChamadoPorIdController, listarChamadosPorTecnicoController, fecharChamadoController } from "../controllers/ChamadoController.js";
import { criarApontamentoController } from "../controllers/ApontamentoController.js";
import { criarMensagemController } from "../controllers/MensagemController.js";

const router = express.Router();

//Lista de chamados disponíveis para autoatribuição
router.post('/:id/pool-chamadas', chamadosSemTecnicoController)

//Atribui chamado ao técnico logado
router.post('/chamados/:id/atribuir/', autoAtribuirAoChamadoController)

router.post('/chamados/:id/tipo-errado/', criarMensagemController)

// Lista de Chamados do Técnico
router.get('/:id/chamados', listarChamadosPorTecnicoController)

// Detalhes de um chamado específico (com status, histórico de apontamentos etc)
router.get('/chamados/:id', obterChamadoPorIdController);

// Cria novo apontamento
router.post('/chamados/:id/apontamento', criarApontamentoController);

// Fechar chamado com resolução
router.post('/chamados/:id/fechar', fecharChamadoController);

export default router;