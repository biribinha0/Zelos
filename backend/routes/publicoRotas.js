import express from "express";
import { listarChamadosPublicosController } from "../controllers/ChamadoController.js";
import { criarMensagemController, listarFeedbacksController } from "../controllers/MensagemController.js";

const router = express.Router();

//Lista de chamados públicos
router.get('/chamados', listarChamadosPublicosController);

router.post('/mensagem', criarMensagemController)

router.get('/feedbacks', listarFeedbacksController)

export default router;
