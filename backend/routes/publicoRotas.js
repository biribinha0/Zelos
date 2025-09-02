import express from "express";
import { listarChamadosPublicosController} from "../controllers/ChamadoController.js";
import { criarMensagemController } from "../controllers/MensagemController.js";

const router = express.Router();

//Lista de chamados públicos
router.get('/chamados', listarChamadosPublicosController);

router.post('/mensagem', criarMensagemController)

export default router;
