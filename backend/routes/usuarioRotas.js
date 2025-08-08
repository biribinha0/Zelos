import express from "express";
import { criarChamadoController, obterChamadoPorIdController, listarChamadosPorUsuarioController } from "../controllers/ChamadoController.js";
import { buscarEquipamentosController } from "../controllers/UsuarioController.js";

const router = express.Router();

// Rota para criação de chamado
router.post('/chamados', criarChamadoController);

// Rota para listar chamados de um usuario
router.get('/:id/chamados/', listarChamadosPorUsuarioController);

// Rota para detalhes de um chamado (apontamento, histórico)
router.get('/chamados/:id', obterChamadoPorIdController);

// Rota para listar equipamentos com querys
router.get('/equipamentos/', buscarEquipamentosController)

export default router;


