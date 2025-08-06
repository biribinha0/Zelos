import express from "express";
import { listarChamadosPublicosController, criarChamadoController, editarChamadoController, obterChamadoPorIdController, listarChamadosController, listarChamadosController, listarChamadosPorUsuarioController } from "../controllers/ChamadoController.js";

const router = express.Router();

router.get('/usuario/:id', listarChamadosPorUsuarioController);



router.post('/', criarChamadoController);

router.put('/:id', editarChamadoController);

router.get('/:id', obterChamadoPorIdController)

router.get('/', listarChamadosController);


export default router;

