import express from "express";
import { criarChamadoController, obterChamadoPorIdController, listarChamadosPorUsuarioController } from "../controllers/ChamadoController.js";

const router = express.Router();

// Rota para criação de chamado
router.post('/chamados', criarChamadoController);

// Rota para listar chamados de um usuario
router.get('/:id/chamados/', listarChamadosPorUsuarioController);

// Rota para detalhes de um chamado (apontamento, histórico)
router.get('/chamados/:id', obterChamadoPorIdController);

export default router;


