import express from "express";
import { chamadosSemTecnicoController, autoAtribuirAoChamadoController, obterChamadoPorIdController, listarChamadosPorUsuarioController } from "../controllers/ChamadoController.js";
import { criarApontamentoController } from "../controllers/ApontamentoController.js";

const router = express.Router();

//Lista de chamados disponíveis para autoatribuição
router.post('/pool-chamadas', chamadosSemTecnicoController)

//Atribui chamado ao técnico logado
router.post('/chamados/:id/atribuir/', autoAtribuirAoChamadoController)

// Lista de Chamados do Usuário
router.get('/:id/chamados', listarChamadosPorUsuarioController)

// Detalhes de um chamado específico (com status, histórico de apontamentos etc)
router.get('/chamados/:id', obterChamadoPorIdController);

// Cria novo apontamento
router.post('/chamados/:id/apontamento', criarApontamentoController);

export default router;