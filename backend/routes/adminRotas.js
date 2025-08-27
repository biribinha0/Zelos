import express from "express";

import { listarChamadosController, editarChamadoController, fecharChamadoController, obterChamadoPorIdController, fecharChamadoSemApontamento, listarChamadosPorUsuarioController } from "../controllers/ChamadoController.js";
import { listarUsuariosController } from "../controllers/UsuarioController.js";
import { gerarRelatorio } from '../controllers/RelatorioContoller.js';

const router = express.Router();

// /admin/chamados	Retorna todos os chamados com filtros e dados estendidos
router.get('/chamados', listarChamadosController);

router.get('/chamados/:id', obterChamadoPorIdController);

router.get('/chamados/usuario/:id', listarChamadosPorUsuarioController);

// /admin/chamados/:id	Editar chamado (status, técnico, dados gerais)
router.put('/chamados/:id', editarChamadoController);

// Fechar chamado com resolução
router.post('/chamados/:id/fechar', fecharChamadoSemApontamento);

// Lista todos os usuários comuns (CRUD)
router.get('/usuarios', listarUsuariosController);

// Retorna dados para gráficos e exportações (com filtros por query params)
router.get('/relatorios', gerarRelatorio);


export default router;