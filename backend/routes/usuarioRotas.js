import express from "express";
import { listarChamadosPublicosController, criarChamadoController, editarChamadoController, obterChamadoPorIdController, listarChamadosController, listarChamadosController, listarChamadosPorUsuarioController } from "../controllers/ChamadoController.js";

const router = express.Router();

router.post('/chamados', criarChamadoController);

router.get('/chamados/usuario/:id', listarChamadosPorUsuarioController);

router.get('chamados/:id', obterChamadoPorIdController);

export default router;


