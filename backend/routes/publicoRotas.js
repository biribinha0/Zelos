import express from "express";
import { listarChamadosPublicosController} from "../controllers/ChamadoController.js";

const router = express.Router();

//Lista de chamados públicos
router.get('/chamados', listarChamadosPublicosController);

export default router;
