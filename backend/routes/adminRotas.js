import express from "express";

import { listarChamadosController, editarChamadoController, fecharChamadoController, obterChamadoPorIdController, fecharChamadoSemApontamento, listarChamadosPorUsuarioController } from "../controllers/ChamadoController.js";
import { listarUsuariosController, mudarStatusController } from "../controllers/UsuarioController.js";
import { gerarRelatorio } from '../controllers/RelatorioContoller.js';

const router = express.Router();

// /admin/chamados	Retorna todos os chamados com filtros e dados estendidos
router.get('/chamados', listarChamadosController);

// obtem usuario por id para exibição de informações
router.get('/chamados/:id', obterChamadoPorIdController);

//listagem de chamados por usuário
router.get('/chamados/usuario/:id', listarChamadosPorUsuarioController);

// /admin/chamados/:id	Editar chamado (status, técnico, dados gerais)
router.put('/chamados/:id', editarChamadoController);

// Fechar chamado com resolução
router.post('/chamados/:id/fechar', fecharChamadoSemApontamento);

// Lista todos os usuários comuns (CRUD)
router.get('/usuarios', listarUsuariosController);

// Controla o status de um usuário
router.post('/usuarios/:id/status', mudarStatusController)

// Retorna dados para gráficos e exportações (com filtros por query params)
router.get('/relatorios', gerarRelatorio);


export default router;